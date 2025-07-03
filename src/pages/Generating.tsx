import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Generating() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const generate = async () => {
            const res = await fetch('http://localhost:3001/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: state.prompt })
            });
            const data = await res.json();
            navigate('/video', { state: { videoUrl: data.videoUrl } });
        };
        generate();
    }, [state.prompt, navigate]);

    return <div style={{ textAlign: 'center', paddingTop: '5rem' }}>Generating video... ⏳</div>;
}
