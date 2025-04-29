import { useEffect, useState } from 'react';

function Pomodoro() {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Pomodoro Timer</h2>
      <h1 style={{ fontSize: '4rem', margin: '2rem 0' }}>{formatTime(timeLeft)}</h1>

      <div>
        {!isRunning ? (
          <button onClick={handleStart} style={buttonStyle}>Start</button>
        ) : (
          <button onClick={handlePause} style={buttonStyle}>Pause</button>
        )}
        <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#ef4444' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#0d9488',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default Pomodoro;
