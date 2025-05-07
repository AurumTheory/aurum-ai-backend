// server.js
const express = require('express');
const fetch = require('node-fetch');
const { Connection, PublicKey } = require('@solana/web3.js');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPAI_API_KEY = process.env.DEEPAI_API_KEY;
const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const AU_TOKEN_MINT = 'YOUR_AU_TOKEN_MINT_ADDRESS'; // Ganti dengan mint address $AU

// DeepSeek Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-reasoner',
                messages: [{
                    role: 'user',
                    content: `You are Aurum AI, an expert in crypto futures market analysis. Analyze: "${message}". Provide a detailed prediction including price trends bearish / bullish, volatility, and trading signals for the futures market. and give confident level from 1-5 (Very low, Low, Moderate, High, Very High)`
                }],
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch DeepSeek response' });
    }
});

// DeepAI Image Generation Endpoint
app.post('/api/image', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'api-key': DEEPAI_API_KEY,
            },
            body: new FormData().append('text', `${prompt}, in a luxurious crypto-themed style with gold and futuristic elements`),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Verify $AU Token Ownership
app.post('/api/verify-token', async (req, res) => {
    try {
        const { walletAddress } = req.body;
        const connection = new Connection(SOLANA_RPC);
        const tokenAccount = await connection.getTokenAccountsByOwner(
            new PublicKey(walletAddress),
            { mint: new PublicKey(AU_TOKEN_MINT) }
        );
        res.json({ hasToken: tokenAccount.value.length > 0 });
    } catch (error) {
        res.status(500).json({ error: 'Failed to verify token ownership' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
