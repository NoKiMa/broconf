'use client';

import { useEffect, useState } from 'react';

interface RollingDigitProps {
  digit: string;
}

export default function RollingDigit({ digit }: RollingDigitProps) {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [prevDigit, setPrevDigit] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPrevDigit(currentDigit);
      setCurrentDigit(digit);
      setAnimating(true);
      
      const timer = setTimeout(() => {
        setAnimating(false);
        setPrevDigit(null);
      }, 500); // Matches the CSS animation duration
      
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative overflow-hidden w-[0.6em] h-[1.2em] inline-flex justify-center items-center">
      {/* Current Digit */}
      <span 
        className={`absolute inset-0 flex items-center justify-center font-bold tracking-tighter ${animating ? 'animate-slide-in-top' : ''}`}
      >
        {currentDigit}
      </span>
      
      {/* Previous Digit */}
      {animating && prevDigit !== null && (
        <span className="absolute inset-0 flex items-center justify-center font-bold tracking-tighter animate-slide-out-bottom">
          {prevDigit}
        </span>
      )}
    </div>
  );
}
