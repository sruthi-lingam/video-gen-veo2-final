import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const funFacts = [
    "🎬 Did you know? AI can generate entire movie scenes from just one sentence!",
    "🤖 Video generation models learn by watching millions of hours of real footage.",
    "💡 Your prompt is being turned into pixels... by math and machine learning!",
    "⚙️ AI models like Veo use transformers — the same tech behind ChatGPT!",
    "🌈 AI-generated videos can remix colors, motion, and style all at once!",
    "📽️ This video is unique — no one else in the world has seen it before!",
    "🎨 Some video AIs even let you draw or upload an image to animate!",
    "🚀 Your imagination is the script. The AI is your director!"
];

export default function Generating() {
    const location = useLocation();
    const navigate = useNavigate();
    const videoUrl = location.state?.videoUrl;
    const prompt = location.state?.prompt;

    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const hasGenerated = useRef(false);
    useEffect(() => {
        const factTimer = setInterval(() => {
            setCurrentFactIndex(prev => (prev + 1) % funFacts.length);
        }, 2000);

        return () => clearInterval(factTimer);
    }, []);

    useEffect(() => {
        if (hasGenerated.current) return;

        if (prompt) {
            hasGenerated.current = true;

            const generateVideo = async () => {
                try {
                    const res = await fetch('http://localhost:3001/api/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt })
                    });

                    const data = await res.json();
                    if (data.videoUrl) {
                        navigate('/video', { state: { videoUrl: data.videoUrl } });
                    } else {
                        alert('Video generation failed.');
                        navigate('/');
                    }
                } catch (err) {
                    console.error('Error generating video:', err);
                    alert('Something went wrong.');
                    navigate('/');
                }
            };

            generateVideo();
        } else if (videoUrl) {
            hasGenerated.current = true;

            const timer = setTimeout(() => {
                navigate('/video', { state: { videoUrl } });
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            navigate('/');
        }
    }, [prompt, videoUrl, navigate]);

    return (
        <div style={{
            backgroundColor: '#000',
            color: '#0ff',
            padding: '2rem',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            textAlign: 'center',
            transition: 'all 0.3s ease-in-out'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                🎉 Generating your video
            </div>

            <div style={{
                backgroundColor: '#111',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                border: '2px dashed #0ff',
                animation: 'pulse 3s infinite ease-in-out'
            }}>
                {funFacts[currentFactIndex]}
            </div>

            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.05); opacity: 0.85; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
}
