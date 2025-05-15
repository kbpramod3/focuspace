import { useEffect, useState } from 'react';
import "../styles/pomodoro.css";

function Pomodoro() {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [focusDuration, setFocusDuration] = useState(25); // in minutes
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
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
    <div className="pomodoro-container">
      <div className="settings-section">
        <h3>Custom Timer Settings</h3>
        <label>
          Focus:
          <input type="number" value={focusDuration} onChange={(e) => setFocusDuration(Number(e.target.value))} />
          min
        </label>
        <label>
          Short Break:
          <input type="number" value={shortBreak} onChange={(e) => setShortBreak(Number(e.target.value))} />
          min
        </label>
        <label>
          Long Break:
          <input type="number" value={longBreak} onChange={(e) => setLongBreak(Number(e.target.value))} />
          min
        </label>
        <button onClick={() => { setTimeLeft(focusDuration * 60); setIsRunning(false); }}>
          Apply
        </button>
      </div>
  
      <h1 className="timer-display">{formatTime(timeLeft)}</h1>
  
      <div className="control-buttons">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button className="reset" onClick={handleReset}>Reset</button>
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
