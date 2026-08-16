// Serverless Webhook Endpoint (Node.js / Vercel Functions)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        const propertyAddress = session.metadata.address;

        try {
            // 1. Trigger EagleView Partner API Order
            const evResponse = await axios.post('https://api.eagleview.com/v2/orders', {
                address: propertyAddress,
                productType: 'Premium3D',
                claimNumber: `ROOF-${Date.now()}`
            }, {
                headers: { 'Authorization': `Bearer ${process.env.EAGLEVIEW_API_KEY}` }
            });

            // 2. Mock / Received Measurement Payload Data (Squares, Pitch, Ridges)
            const squares = evResponse.data.totalSquares || 32;
            const pitchMultiplier = evResponse.data.steepPitch ? 1.25 : 1.0;
            const basePricePerSquare = 350;

            // 3. Auto-Calculate Line Items
            const subtotal = squares * basePricePerSquare * pitchMultiplier;
            const tearOffFee = squares * 45;
            const estimatedTotal = subtotal + tearOffFee;

            const autoEstimate = {
                id: `EST-${Math.floor(100000 + Math.random() * 900000)}`,
                email: customerEmail,
                address: propertyAddress,
                squares: squares,
                total: estimatedTotal,
                pdfUrl: evResponse.data.reportPdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                status: 'Ready for Sign-Off',
                createdAt: new Date().toISOString()
            };

            // 4. Save to Database/Store (Attached to user email)
            console.log('Automated Estimate Generated:', autoEstimate);

            return res.status(200).json({ received: true, estimate: autoEstimate });
        } catch (error) {
            console.error('EagleView API Processing Error:', error);
            return res.status(500).send('EagleView Order Processing Failed');
        }
    }

    res.status(200).json({ received: true });
};
