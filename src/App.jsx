import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(e); // Save the event for later
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null); // Clear the saved prompt
    setIsInstallable(false); // Hide the button after use
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>FocusPace</h1>
      <p>Your personal Pomodoro + productivity tracker</p>

      {isInstallable && (
        <button
          onClick={handleInstallClick}
          style={{
            marginTop: '2rem',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0d9488',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Install FocusPace
        </button>
      )}

    <Link to="/pomodoro" style={{ marginTop: '1rem', display: 'inline-block' }}>
    <button style={{
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#0d9488',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
}}>
  Go to Pomodoro Timer
</button>

    </Link>
    </div>
  );
}

export default App;

