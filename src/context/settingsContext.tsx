// src/context/SettingsContext.js
import { createContext, useState } from "react";

export const SettingsContext = createContext({
  focusDuration: 25,
  setFocusDuration: (a) => {},
  breakDuration: 5,
  setBreakDuration: (a) => {}
});

export const SettingsProvider = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  return (
    <SettingsContext.Provider value={{ focusDuration,setFocusDuration, breakDuration, setBreakDuration}}>
      {children}
    </SettingsContext.Provider>
  );
};
