require('dotenv').config();
const express = require('express');
const path = require('path');
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const db = require('./db/db.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup AWS Cognito JWT Verifier (optional verifier if userPoolId is present)
let verifier = null;
try {
  if (process.env.COGNITO_USER_POOL_ID && process.env.COGNITO_CLIENT_ID) {
    verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      tokenUse: 'id',
      clientId: process.env.COGNITO_CLIENT_ID,
    });
  }
} catch (e) {
  console.warn('Cognito JWT verifier initialization skipped.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Dynamic Authentication Middleware: Supports Cognito Bearer JWT, X-User-Email header, or local dev fallback
async function authenticateUserSession(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const headerEmail = req.headers['x-user-email'];
  const headerName = req.headers['x-user-name'];

  // 1. Check Cognito JWT Token if present
  if (token && verifier) {
    try {
      const payload = await verifier.verify(token);
      req.user = {
        sub: payload.sub,
        email: payload.email.toLowerCase().trim(),
        name: payload.name || payload.email.split('@')[0],
        role: payload['custom:role'] || 'customer'
      };
      return next();
    } catch (err) {
      console.warn('Cognito token verification failed, checking request headers:', err.message);
    }
  }

  // 2. Check Custom User Session Headers (passed from client storage/login)
  if (headerEmail) {
    const cleanEmail = String(headerEmail).toLowerCase().trim();
    const cleanName = headerName ? String(headerName).trim() : cleanEmail.split('@')[0];
    req.user = {
      sub: `user-${cleanEmail}`,
      email: cleanEmail,
      name: cleanName,
      role: req.headers['x-user-role'] || 'customer'
    };
    return next();
  }

  // 3. Fallback for unauthenticated local development
  req.user = {
    sub: 'local-dev-user-id',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'customer'
  };
  next();
}

// GET: Fetch customer dashboard data, profile, tier, spend, projects & layout
app.get(['/api/customer/dashboard-data', '/api/customer/dashboard-data/:id'], authenticateUserSession, async (req, res) => {
  const { email, sub, name, role } = req.user;

  try {
    let userRes = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userRes.rows.length === 0) {
      userRes = await db.query(
        `INSERT INTO users (email, cognito_sub, name, role) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [email, sub, name, role]
      );
    }

    const user = userRes.rows[0];

    const projectsRes = await db.query(
      'SELECT id, title, status, type, color, sqft, notes, created_at FROM projects WHERE user_email = $1 ORDER BY created_at DESC',
      [email]
    );

    res.json({
      profile: {
        name: user.name || name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || ''
      },
      role: user.role || 'customer',
      spend: parseFloat(user.spend || 0),
      tier: user.tier || 'Standard',
      layout: user.layout,
      projects: projectsRes.rows,
      invoices: []
    });
  } catch (err) {
    console.error('Database query error in dashboard-data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: Save or update customer profile details (Name, Phone, Address)
app.post(['/api/customer/profile', '/api/customer/profile/:id'], authenticateUserSession, async (req, res) => {
  const { email } = req.user;
  const { name, phone, address } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO users (email, name, phone, address)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email)
       DO UPDATE SET 
         name = COALESCE(EXCLUDED.name, users.name), 
         phone = COALESCE(EXCLUDED.phone, users.phone), 
         address = COALESCE(EXCLUDED.address, users.address),
         updated_at = CURRENT_TIMESTAMP
       RETURNING email, name, phone, address, role, spend, tier`,
      [email, name || '', phone || '', address || '']
    );

    res.json({ success: true, profile: result.rows[0] });
  } catch (err) {
    console.error('Error updating customer profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST: Save GridStack layout configuration per user
app.post(['/api/customer/layout', '/api/customer/layout/:id'], authenticateUserSession, async (req, res) => {
  const { email } = req.user;
  const { layout } = req.body;

  try {
    if (layout) {
      await db.query(
        `UPDATE users SET layout = $1, updated_at = CURRENT_TIMESTAMP WHERE email = $2`,
        [JSON.stringify(layout), email]
      );
    }
    res.json({ success: true, layout });
  } catch (err) {
    console.error('Error saving layout:', err);
    res.status(500).json({ error: 'Failed to save layout state' });
  }
});

// POST: Create a new project estimate request attached to user email
app.post('/api/customer/estimates', authenticateUserSession, async (req, res) => {
  const { email } = req.user;
  const { title, type, color, sqft, notes } = req.body;

  const projectId = `PRJ-${Math.floor(10000 + Math.random() * 90000)}`;

  try {
    const newProject = await db.query(
      `INSERT INTO projects (id, user_email, title, status, type, color, sqft, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, title, status, type, color, sqft, notes, created_at`,
      [projectId, email, title || 'New Paint Estimate', 'Pending Review', type || 'Interior Painting', color || 'N/A', parseInt(sqft || 0, 10), notes || '']
    );

    res.status(201).json({ success: true, project: newProject.rows[0] });
  } catch (err) {
    console.error('Error creating estimate:', err);
    res.status(500).json({ error: 'Failed to create project estimate' });
  }
});

// ==========================================
// ADMIN OKR, KPI & EXECUTIVE ANALYTICS ENDPOINTS
// ==========================================

// GET: Executive High-Level Metrics & Chart Data
app.get('/api/admin/metrics', async (req, res) => {
  try {
    const totalUsersRes = await db.query('SELECT COUNT(*) FROM users');
    const totalProjectsRes = await db.query('SELECT COUNT(*) FROM projects');
    const totalOkrsRes = await db.query('SELECT COUNT(*), AVG(current_value * 100.0 / NULLIF(target_value, 0)) as avg_completion FROM okrs');
    const revenueRes = await db.query('SELECT SUM(spend) as total_revenue FROM users');

    const totalUsers = parseInt(totalUsersRes.rows[0].count, 10) || 12;
    const totalProjects = parseInt(totalProjectsRes.rows[0].count, 10) || 8;
    const avgOkrCompletion = parseFloat(totalOkrsRes.rows[0].avg_completion || 84.5).toFixed(1);
    const totalRevenue = parseFloat(revenueRes.rows[0].total_revenue || 485250).toFixed(2);

    res.json({
      metrics: {
        totalRevenue: `$${totalRevenue}`,
        activeProjects: totalProjects,
        okrAlignmentPct: `${avgOkrCompletion}%`,
        complianceScore: '98.5%',
        safetyRating: '99.2%'
      },
      charts: {
        revenueByService: {
          labels: ['Interior Painting', 'Exterior Siding', 'Cabinet Refinishing', 'Handyman Repairs', 'Deck Staining'],
          data: [45, 30, 12, 8, 5]
        },
        monthlyRevenueTrend: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          actual: [32, 38, 45, 52, 61, 74, 82, 89, 95],
          target: [30, 35, 40, 50, 60, 70, 80, 85, 90]
        },
        okrRoleBreakdown: {
          labels: ['Customers', 'Contractors', 'Employees'],
          progress: [78, 92, 85]
        }
      }
    });
  } catch (err) {
    console.error('Error fetching admin metrics:', err);
    res.status(500).json({ error: 'Failed to fetch executive metrics' });
  }
});

// GET: Fetch OKRs (filterable by role)
app.get('/api/admin/okrs', async (req, res) => {
  const { role } = req.query;
  try {
    let query = 'SELECT * FROM okrs';
    const params = [];
    if (role && role !== 'all') {
      query += ' WHERE role = $1';
      params.push(role);
    }
    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching OKRs:', err);
    res.status(500).json({ error: 'Failed to fetch OKRs' });
  }
});

// POST: Create or update an OKR Goal
app.post('/api/admin/okrs', async (req, res) => {
  const { id, user_email, user_name, role, objective, key_result, target_value, current_value, unit, status, target_date } = req.body;
  const okrId = id || `okr-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const result = await db.query(
      `INSERT INTO okrs (id, user_email, user_name, role, objective, key_result, target_value, current_value, unit, status, target_date, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)
       ON CONFLICT (id)
       DO UPDATE SET
         user_email = EXCLUDED.user_email,
         user_name = EXCLUDED.user_name,
         role = EXCLUDED.role,
         objective = EXCLUDED.objective,
         key_result = EXCLUDED.key_result,
         target_value = EXCLUDED.target_value,
         current_value = EXCLUDED.current_value,
         unit = EXCLUDED.unit,
         status = EXCLUDED.status,
         target_date = EXCLUDED.target_date,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [okrId, user_email, user_name || user_email.split('@')[0], role || 'customer', objective, key_result, parseFloat(target_value || 100), parseFloat(current_value || 0), unit || '%', status || 'In Progress', target_date || null]
    );

    res.status(201).json({ success: true, okr: result.rows[0] });
  } catch (err) {
    console.error('Error saving OKR:', err);
    res.status(500).json({ error: 'Failed to save OKR goal' });
  }
});

// DELETE: Remove an OKR Goal
app.delete('/api/admin/okrs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM okrs WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting OKR:', err);
    res.status(500).json({ error: 'Failed to delete OKR' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Handyman Command Portal server running with PostgreSQL at http://localhost:${PORT}`);
});
