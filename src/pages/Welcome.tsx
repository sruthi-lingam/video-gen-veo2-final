export default function Welcome() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>🎬 Welcome to Movie Maker</h1>
            <a href="/options" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#1e90ff', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Start</a>
        </div>
    );
}