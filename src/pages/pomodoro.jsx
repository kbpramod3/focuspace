import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pomodoro.css";

function Pomodoro() {
  const location = useLocation();
  const { focusDuration = 25, breakDuration = 5 } = location.state || {};
  
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true); // Track focus/break
  const navigate = useNavigate();

  // Request Notification Permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // When timer ends
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);

      const nextPhase = isFocus ? "Break" : "Focus";
      const nextDuration = isFocus ? breakDuration * 60 : focusDuration * 60;

      // Show Notification
      if (Notification.permission === "granted") {
        new Notification(`${isFocus ? "Focus" : "Break"} session ended`, {
          body: `Time for ${nextPhase.toLowerCase()}!`,
        });
      }

      setTimeout(() => {
        setIsFocus(!isFocus);
        setTimeLeft(nextDuration);
        setIsRunning(true); // Auto-restart next phase
      }, 1000); // 1 second delay before next phase starts
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isFocus, focusDuration, breakDuration]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(focusDuration * 60);
    setIsFocus(true);
  };

  const settings = () => {
    navigate("/settings", {
      state: { focusDuration, breakDuration }
    });
  };

  return (
    <div className="pomodoro-container">
      <button onClick={settings}>Settings</button>
      <h2>{isFocus ? "Focus Time" : "Break Time"}</h2>
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

export default Pomodoro;
