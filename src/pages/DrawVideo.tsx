import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function DrawVideoPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [color, setColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const navigate = useNavigate();

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const handleSubmit = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const imageBlob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/png')
        );
        if (!imageBlob) return;

        const formData = new FormData();
        formData.append('image', imageBlob);

        const res = await fetch('http://localhost:3001/api/generate-from-image', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        navigate('/video', { state: { videoUrl: data.videoUrl } });
    };

    return (
        <div style={{
            backgroundColor: '#111',
            color: 'white',
            padding: '2rem',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            <BackButton/>
            <h2>🎨 Draw Your Video</h2>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{border: '1px solid white', backgroundColor: 'white', borderRadius: '8px'}}
            />

            <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <label>Choose Color: </label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                <button onClick={() => setColor('#ffffff')}>🧽 Eraser</button>
            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#1e90ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Submit My Picture
            </button>



        </div>
    );
}
