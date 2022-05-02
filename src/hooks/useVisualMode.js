import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  // 'history' functions somewhat like a stack, but can optionally replace the last element to be added to the stack
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];

    // If indicated by parameters, replace the previous element by popping it
    replace && newHistory.pop();

    newHistory.push(newMode);

    // Update the history stack
    setMode(newMode);
    // Set the mode to the last thing to be added to the history stack
    setHistory(newHistory);
  };

  const back = () => {
    const newHistory = [...history];

    // only pop if we're not at the final element of history
    if (newHistory.length > 1) newHistory.pop();

    // Update the history stack
    setHistory(newHistory);
    // Set the mode to the last thing to be added to the history stack
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}
