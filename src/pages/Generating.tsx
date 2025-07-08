import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Generating() {
    const location = useLocation();
    const navigate = useNavigate();
    const prompt = location.state?.prompt;

    useEffect(() => {
        if (!prompt) {
            navigate('/');
            return;
        }

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
                }
            } catch (error) {
                console.error('Error generating video:', error);
                alert('Something went wrong.');
            }
        };

        generateVideo();
    }, [prompt, navigate]);

    return (
        <div style={{
            backgroundColor: '#111',
            color: 'white',
            padding: '2rem',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem'
        }}>
            ⏳ Generating your video...
        </div>
    );
}
