import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Pomodoro from './pages/pomodoro.jsx';
import Settings from './pages/settings.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
