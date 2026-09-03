const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER || 'HDM',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'Customer Accounts',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Endpoint to fetch user projects and change orders from PostgreSQL
app.get('/api/user/data', async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email parameter required' });

    try {
        const clientRes = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
        if (clientRes.rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerId = clientRes.rows[0].id;

        const projectsRes = await pool.query('SELECT * FROM projects WHERE customer_id = $1', [customerId]);
        const coRes = await pool.query('SELECT * FROM change_orders WHERE customer_id = $1', [customerId]);

        // Group projects by status
        const projects = { active: [], pending: [], completed: [], declined: [] };
        projectsRes.rows.forEach(p => {
            if (projects[p.status]) projects[p.status].push(p);
        });

        res.json({
            active: projects.active,
            pending: projects.pending,
            completed: projects.completed,
            declined: projects.declined,
            changeOrders: coRes.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query error' });
    }
});

// Endpoint to approve a change order in PostgreSQL
app.post('/api/change-orders/approve', async (req, res) => {
    const { changeOrderId } = req.body;
    try {
        await pool.query("UPDATE change_orders SET status = 'approved' WHERE id = $1", [changeOrderId]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update change order' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Handyman Painting backend running on port ${PORT}`);
});
