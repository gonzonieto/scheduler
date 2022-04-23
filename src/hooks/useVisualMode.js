import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  
  // history is a stack
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    const newHistory = [...history];
    newHistory.push(newMode);
    
    setMode(newMode);
    setHistory(newHistory);
  };
  
  const back = () => {
    const newHistory = [...history];

    // only pop if we're not at the final element of history
    if (newHistory.length > 1) newHistory.pop();

    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };
  
  return { mode, transition, back };
};