const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Schema initialization without seed/dummy data
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS okrs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        target_value NUMERIC NOT NULL,
        current_value NUMERIC DEFAULT 0,
        unit VARCHAR(50),
        status VARCHAR(50) DEFAULT 'in-progress',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('Database tables verified successfully with zero dummy data.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing database schema:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, initDb };
// Append to db/db.cjs - Admin Unified Search & Lazy Account Binding
const { pool } = require('./db.cjs');

/**
 * Fetch all business data for Admin Dashboard
 */
async function getAdminOverviewData() {
  const usersCount = await pool.query('SELECT COUNT(*) FROM users;');
  const okrsCount = await pool.query('SELECT COUNT(*) FROM okrs;');
  
  return {
    totalUsers: parseInt(usersCount.rows[0].count, 10),
    totalOkrs: parseInt(okrsCount.rows[0].count, 10)
  };
}

/**
 * Fetch customer dashboard data linked by user email (works for new accounts matching past business records)
 * @param {string} customerEmail 
 */
async function getCustomerDataByEmail(customerEmail) {
  const normalizedEmail = customerEmail.toLowerCase().trim();

  // Queries match by email regardless of when the account was created
  const userProfile = await pool.query(
    'SELECT id, email, created_at FROM users WHERE LOWER(email) = $1;',
    [normalizedEmail]
  );

  const customerOkrs = await pool.query(
    'SELECT * FROM okrs WHERE LOWER(owner_email) = $1;',
    [normalizedEmail]
  );

  return {
    isRegistered: userProfile.rows.length > 0,
    profile: userProfile.rows[0] || null,
    records: customerOkrs.rows
  };
}

module.exports = {
  getAdminOverviewData,
  getCustomerDataByEmail
};
