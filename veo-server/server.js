import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { exec } from 'child_process';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.post('/api/generate', (req, res) => {
    const prompt = req.body.prompt;
    console.log("🟡 Generating video for prompt:", prompt);

    const command = `python3 generate_video.py "${prompt.replace(/"/g, '\\"')}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Python script error:', error.message);
            return res.status(500).json({ error: 'Failed to generate video' });
        }
        if (stderr) {
            console.warn('⚠️ Python stderr:', stderr);
        }

        const videoUrl = stdout.trim();
        if (!videoUrl.startsWith("gs://")) {
            console.error('❌ Invalid gs:// URI returned:', videoUrl);
            return res.status(500).json({ error: 'Invalid video URL format' });
        }

        console.log("✅ Video URL:", videoUrl);
        res.json({ videoUrl }); // ✅ Respond with gs:// URL
    });
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
