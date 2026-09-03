const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

// Initialize PostgreSQL Connection Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// GET: Fetch customer profile and layout configuration
router.get('/api/customer/dashboard-data/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const profileRes = await pool.query('SELECT * FROM customer_profiles WHERE id = $1', [customerId]);
        const layoutRes = await pool.query('SELECT layout_data FROM user_dashboard_layouts WHERE customer_id = $1', [customerId]);

        if (profileRes.rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({
            profile: profileRes.rows[0],
            layout: layoutRes.rows[0]?.layout_data || null
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST: Save or update customer profile details
router.post('/api/customer/profile', async (req, res) => {
    const { customerId, name, phone, address } = req.body;
    try {
        const query = `
            UPDATE customer_profiles 
            SET name = $1, phone = $2, address = $3, updated_at = NOW() 
            WHERE id = $4 
            RETURNING *;
        `;
        const result = await pool.query(query, [name, phone, address, customerId]);
        res.json({ success: true, profile: result.rows[0] });
    } catch (err) {
        console.error('Error saving profile:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// POST: Save GridStack layout configuration
router.post('/api/customer/layout', async (req, res) => {
    const { customerId, layout } = req.body;
    try {
        const query = `
            INSERT INTO user_dashboard_layouts (customer_id, layout_data, updated_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (customer_id) 
            DO UPDATE SET layout_data = EXCLUDED.layout_data, updated_at = NOW();
        `;
        await pool.query(query, [customerId, JSON.stringify(layout)]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving layout:', err);
        res.status(500).json({ error: 'Failed to save layout' });
    }
});

module.exports = router;
