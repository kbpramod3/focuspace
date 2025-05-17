import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/pomodoro.css";

function Settings() {
  const location = useLocation();
  const { focusDuration: initialFocus = 25, breakDuration: initialBreak = 5 } = location.state || {};

  const [focusDuration, setFocusDuration] = useState(initialFocus);
  const [breakDuration, setBreakDuration] = useState(initialBreak);
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/pomodoro",{
      state: { focusDuration, breakDuration }});
  };

  return (
    <div className="settings-section">
      <h2>Timer Settings</h2>
      <label>
        Focus Duration:
        <input type="number" value={focusDuration} onChange={(e) => setFocusDuration(Number(e.target.value))} />
        min
      </label>
      <label>
        Break:
        <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} />
        min
      </label>
      <button onClick={handleApply}>Apply & Go Back</button>
    </div>
  );
}

export default Settings;
