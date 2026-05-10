'use client';

import { useEffect, useState } from 'react';
import RollingDigit from './RollingDigit';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  onComplete: () => void;
}

export default function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Avoid hydration mismatch by not rendering the actual time until mounted
  if (!mounted) {
    return <div className="h-16 md:h-24 w-full"></div>; // Placeholder
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const formattedDays = formatNumber(timeLeft.days);
  const formattedHours = formatNumber(timeLeft.hours);
  const formattedMinutes = formatNumber(timeLeft.minutes);
  const formattedSeconds = formatNumber(timeLeft.seconds);

  const isUrgent = timeLeft.days === 0 && timeLeft.hours === 0;

  const Separator = () => (
    <span className="mx-1 md:mx-3 opacity-50 pb-1">:</span>
  );

  return (
    <div className={`flex items-center text-5xl md:text-8xl font-light tracking-widest transition-colors duration-1000 ${isUrgent ? 'text-red-500' : 'text-white'}`}>
      <div className="flex">
        {formattedDays.split('').map((digit, i) => (
          <RollingDigit key={`d-${i}`} digit={digit} />
        ))}
      </div>
      <Separator />
      <div className="flex">
        {formattedHours.split('').map((digit, i) => (
          <RollingDigit key={`h-${i}`} digit={digit} />
        ))}
      </div>
      <Separator />
      <div className="flex">
        {formattedMinutes.split('').map((digit, i) => (
          <RollingDigit key={`m-${i}`} digit={digit} />
        ))}
      </div>
      <Separator />
      <div className="flex">
        {formattedSeconds.split('').map((digit, i) => (
          <RollingDigit key={`s-${i}`} digit={digit} />
        ))}
      </div>
    </div>
  );
}
