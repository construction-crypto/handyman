require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Content Security Policy Headers to allow third-party scripts and evaluation
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://cdn.plaid.com https://cdn.jsdelivr.net; frame-src 'self' https://js.stripe.com https://cdn.plaid.com;"
  );
  next();
});

app.use(cors());
app.use(express.json());

// Serve static files (dashboard.html, CSS, JS) from the project directory
app.use(express.static(__dirname));

// Initialize Plaid Client
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Plaid Link Token Route
app.post('/api/create_link_token', async (req, res) => {
  try {
    const userId = req.body.userId || 'default_user';
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'Handyman Painting L.L.C.',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error creating Plaid link token:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Handyman Painting L.L.C. secure payment server running on port ${PORT}`);
});
