import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function VideoPlayer() {
    const { state } = useLocation();

    const convertGsToHttps = (gsUrl: string): string => {
        if (!gsUrl) return '';
        if (gsUrl.startsWith('gs://')) {
            return gsUrl.replace('gs://', 'https://storage.googleapis.com/');
        }
        return gsUrl;
    };

    const publicUrl = convertGsToHttps(state.videoUrl);

    return (
        <div style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
            <BackButton />
            <h2>Your Video</h2>
            <video src={publicUrl} controls width="720" />
        </div>
    );
}
