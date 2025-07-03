import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'transparent',
                color: 'white',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
            }}
            aria-label="Go back"
        >
            ←
        </button>
    );
}
