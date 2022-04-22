import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (newMode) => setMode(newMode);

  const back = () => undefined;
  
  return { mode, transition, back };
};