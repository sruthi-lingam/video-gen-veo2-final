import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const videoData = [
    { id: 1, title: 'Magical Treehouse Spaceship', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/10346815505831575171/sample_0.mp4' },
    //prompt: A group of friendly animals team up to build a magical treehouse that turns into a spaceship and takes them on a colorful adventure

    { id: 2, title: 'Flowers in the Breeze', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/7802941237595905277/sample_0.mp4' },
    //prompt: Flowers swaying gently in the breeze

    { id: 3, title: 'Astronaut Walking on Mars', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/2202642857532573524/sample_0.mp4' },
    //prompt: An astronaut walking across the surface of Mars, with Earth faintly visible in the sky, shot like a 1970s sci-fi film

    { id: 4, title: 'Abstract Infinite Mirror Room', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/11482476215505682977/sample_0.mp4' },
    //prompt: Time fracturing like glass as a person walks through an infinite mirror room

    { id: 5, title: 'Waterfront Mountain Scene', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/8900224712742314004/sample_1.mp4' },
    //prompt: A serene scene of mountains panning in front of water

    { id: 6, title: 'Tokyo Chase at Night', url: 'https://storage.googleapis.com/veo-videos-sruthi-2025/videos/8577632584832806238/sample_0.mp4' }
    //prompt: A dramatic chase scene through neon-lit Tokyo streets at night, fast-paced, cyberpunk style
];

export default function VideoLibrary() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '2rem', position: 'relative' }}>
            <BackButton />
            <h1>🎞️ Video Gallery</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {videoData.map(v => (
                    <div
                        key={v.id}
                        onClick={() => navigate('/video', { state: { videoUrl: v.url } })}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                        <video
                            src={v.url}
                            width="100%"
                            height="200"
                            muted
                            loop
                            autoPlay
                            style={{ borderRadius: '8px' }}
                        />
                        <p>{v.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}