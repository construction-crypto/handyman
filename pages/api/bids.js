export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  const MODE = process.env.PAYPAL_MODE || 'live';

  const BASE_URL = MODE === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';

  try {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(tokenData.error_description || 'PayPal OAuth failed');

    const { customerEmail, title, budget, details } = req.body;
    
    // Create draft PayPal invoice as an unpriced estimate ticket
    const invoiceRes = await fetch(`${BASE_URL}/v2/invoicing/invoices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        detail: { 
          currency_code: 'USD', 
          note: `Customer Request Details: ${details} | Target Budget: ${budget}` 
        },
        primary_recipients: [{ billing_info: { email_address: customerEmail } }],
        items: [
          {
            name: title,
            description: details,
            quantity: '1',
            unit_amount: { currency_code: 'USD', value: '0.00' }
          }
        ],
      }),
    });

    const invoiceData = await invoiceRes.json();
    if (!invoiceRes.ok) throw new Error(invoiceData.message || 'Draft creation failed');

    return res.status(200).json({ success: true, paypalInvoiceId: invoiceData.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
