import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

// === POST endpoint for Veo 2 video generation === //
app.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        // Use GoogleAuth to obtain an access token
        const auth = new GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        // Replace with the actual Veo endpoint if different
        const response = await fetch(
            'https://us-central1-aiplatform.googleapis.com/v1/projects/' +
            process.env.GOOGLE_PROJECT_ID +
            '/locations/us-central1/publishers/google/models/veo-2:predict',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    instances: [{ prompt }]
                })
            }
        );

        const result = await response.json();
        const videoUrl = result?.predictions?.[0]?.videoUri || '';

        res.json({ videoUrl });
    } catch (error) {
        console.error('❌ Error generating video:', error);
        res.status(500).json({ error: 'Video generation failed' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
