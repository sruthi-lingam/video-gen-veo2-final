import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function VideoPlayer() {
    const { state } = useLocation();

    return (
        <div style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
            <BackButton />
            <h2>Your Video</h2>
            <video src={state.videoUrl} controls width="720" />
        </div>
    );
}
