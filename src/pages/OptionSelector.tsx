import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function OptionSelector() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.5rem',
                backgroundColor: '#121212', // dark background
                color: 'white',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
        >
            <BackButton />
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600' }}>What would you like to do?</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => navigate('/create')}
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
                    Make a Video
                </button>
                <button
                    onClick={() => navigate('/library')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    View Video Library
                </button>
            </div>
        </div>
    );
}
