// server.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');        // v2.x
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;   //  keep this line
if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set. Please create a .env file with your key.");
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;      //  use Render’s PORT

app.use(cors());
app.use(express.json());

// Serve the static frontend from the same server
app.use(express.static(__dirname));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(`Received message from frontend: "${userMessage}"`);

    const chatHistory = [{ role: "user", parts: [{ text: userMessage }] }];
    const payload = { contents: chatHistory };

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;


    try {
        const geminiResponse = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error('Gemini API Error:', errorData);
            return res.status(geminiResponse.status).json({
                error: 'Failed to get response from Gemini API',
                details: errorData
            });
        }

        const geminiResult = await geminiResponse.json();
        let botText = "I'm sorry, I couldn't get a clear response from the AI.";

        if (geminiResult.candidates && geminiResult.candidates.length > 0 &&
            geminiResult.candidates[0].content?.parts?.length > 0) {
            botText = geminiResult.candidates[0].content.parts[0].text;
        } else {
            console.warn("Unexpected Gemini API response structure:", geminiResult);
        }

        res.json({ response: botText });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Single server start
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
