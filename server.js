import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getMessages, addMessage } from './messageStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/api/messages', (req, res) => {
    res.json(getMessages());
});

app.post('/api/messages', (req, res) => {
    const { sender, text, timestamp } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Message text is required.' });
    }
    const newMessage = addMessage(sender, text, timestamp);
    res.json({ success: true, message: newMessage });
});

app.listen(PORT, () => {
    console.log(`Handyman Painting L.L.C. server running on port ${PORT}`);
});
