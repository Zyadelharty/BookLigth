// src/components/KeyboardNav.jsx
// Invisible component that wires ← → arrow keys to page navigation.

import { useEffect } from "react";

export default function KeyboardNav({ onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext]);

  return null;
}