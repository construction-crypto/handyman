const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { CognitoJwtVerifier } = require("aws-jwt-verify");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['https://construction.seemoneyproductions.com', 'http://localhost:5500', 'http://127.0.0.1:5500']
}));
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-2_0KddUFn3N",
    tokenUse: "id",
    clientId: "2el0nos2l424pm40sccol616b7",
});

async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = await jwtVerifier.verify(token);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token", details: err.message });
    }
}

app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'success', dbTime: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.get('/api/customers', requireAuth, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customers ORDER BY id DESC');
        res.json({ user: req.user.email, customers: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/customers', requireAuth, async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
