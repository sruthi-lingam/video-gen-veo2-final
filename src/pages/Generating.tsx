import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Generating() {
    const location = useLocation();
    const navigate = useNavigate();
    const videoUrl = location.state?.videoUrl;

    useEffect(() => {
        if (!videoUrl) {
            // If no videoUrl, redirect to home (fallback)
            navigate('/');
        } else {
            // If videoUrl was passed in, navigate after brief delay (optional)
            const timer = setTimeout(() => {
                navigate('/video', { state: { videoUrl } });
            }, 1000); // optional delay to show the "Generating" screen briefly

            return () => clearTimeout(timer);
        }
    }, [videoUrl, navigate]);

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
