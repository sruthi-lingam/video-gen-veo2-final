import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import OptionSelector from './pages/OptionSelector';
import CreateVideo from './pages/CreateVideo';
import Generating from './pages/Generating';
import VideoPlayer from './pages/VideoPlayer';
import VideoLibrary from './pages/VideoLibrary';
import DrawVideo from './pages/DrawVideo';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/options" element={<OptionSelector />} />
            <Route path="/create" element={<CreateVideo />} />
            <Route path="/generating" element={<Generating />} />
            <Route path="/video" element={<VideoPlayer />} />
            <Route path="/library" element={<VideoLibrary />} />
            <Route path="/draw" element={<DrawVideo />} />
        </Routes>
    );
}