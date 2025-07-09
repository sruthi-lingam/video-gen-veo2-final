import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const promptBank = [
    "A robot cooking spaghetti in a futuristic kitchen",
    "A dragon flying over a neon city at night",
    "A skateboarder doing tricks on Mars",
    "An astronaut planting a flag on a giant birthday cake",
    "A cat DJ spinning music in space",
    "A time-traveling kid riding a dinosaur through the jungle",
    "A magical paintbrush that brings drawings to life",
    "A race between a cheetah and a rocket-powered bike",
    "A penguin detective solving mysteries in a snowy city",
    "A turtle learning to surf giant waves in Hawaii",
    "A glowing jellyfish dancing at an underwater disco",
    "A pirate ship flying through outer space",
    "A group of dinosaurs starting their own rock band",
    "A raccoon chef making midnight snacks in a forest café",
    "A kid who can pause time with a smartphone app",
    "A dream where every object floats and glows like neon",
    "A wizard cat brewing potions in a mystical treehouse",
    "A haunted vending machine giving out enchanted snacks",
    "A dragon learning how to paint beautiful city murals",
    "A superhero whose power is controlling the weather",
    "A group of animals on a mission to rescue the moon",
    "A gamer who falls into their favorite video game world"
];

function getRandomPrompts() {
    const shuffled = promptBank.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

export default function PromptIdeas() {
    const [prompts, setPrompts] = useState(getRandomPrompts());
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleGenerateMore = () => {
        setPrompts(getRandomPrompts());
        setSelectedPrompt(null);
        setError(false);
    };

    const handleSubmit = () => {
        if (!selectedPrompt) {
            setError(true);
            return;
        }

        navigate('/generating', { state: { videoUrl: null, prompt: selectedPrompt } });
    };

    return (
        <div style={{
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
        }}>
            <BackButton />
            <h2>Choose a Video Idea</h2>
            <p>Pick a prompt or generate new ones</p>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                margin: '2rem 0'
            }}>
                {prompts.map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedPrompt(prompt);
                            setError(false);
                        }}
                        style={{
                            padding: '1rem',
                            width: '250px',
                            borderRadius: '10px',
                            border: selectedPrompt === prompt ? '3px solid #00f' : '2px solid #aaa',
                            backgroundColor: '#1e1e1e',
                            color: 'white',
                            cursor: 'pointer',
                            transition: '0.2s'
                        }}
                    >
                        {prompt}
                    </button>
                ))}
            </div>

            {error && <p style={{ color: 'red' }}>⚠️ Please select a prompt first.</p>}

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        marginRight: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#00f',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>

                <button
                    onClick={handleGenerateMore}
                    style={{
                        padding: '0.8rem 1.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#444',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Generate More Ideas
                </button>
            </div>
        </div>
    );
}
