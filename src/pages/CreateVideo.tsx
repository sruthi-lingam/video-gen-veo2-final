import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function CreateVideo() {
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }
        setError('');
        navigate('/generating', { state: { prompt } });
    };

    return (
        <div style={{
            padding: '2rem',
            textAlign: 'right', //change to right later
            color: 'white',
            minHeight: '100vh',
            backgroundColor: '#111',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            position: 'relative'
        }}>
            <BackButton />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Describe your Video</h2>

            <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                    width: '60%',
                    padding: '12px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    outline: 'none'
                }}
                placeholder="Example: A cat exploring the moon in a space suit"
            />
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#1e90ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>

                <button
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    I Need Ideas 💡
                </button>

                <button
                    onClick={() => navigate('/draw')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    ✏️ Draw My Video
                </button>
            </div>
        </div>
    );
}
