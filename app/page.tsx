'use client';

import { useEffect, useState } from 'react';
import BackgroundLayer from '@/components/BackgroundLayer';
import CountdownTimer from '@/components/CountdownTimer';
import VerseBlock from '@/components/VerseBlock';
import { EVENT_DATE, EVENT_DATE_END, EVENT_DATE_NOW } from '@/constants/event';

export default function Home() {
  const [eventPhase, setEventPhase] = useState<'upcoming' | 'party' | 'next_year'>('upcoming');

  useEffect(() => {
    const checkPhase = () => {
      const now = new Date().getTime();
      const start = new Date(EVENT_DATE).getTime();
      const end = new Date(EVENT_DATE_END).getTime();

      if (now >= end) {
        setEventPhase('next_year');
      } else if (now >= start) {
        setEventPhase('party');
      } else {
        setEventPhase('upcoming');
      }
    };

    checkPhase();
    const interval = setInterval(checkPhase, 1000);
    return () => clearInterval(interval);
  }, []);

  const isEventStarted = eventPhase === 'party';
  const targetDate = eventPhase === 'next_year' ? EVENT_DATE_NOW : EVENT_DATE;
  const titleText = eventPhase === 'next_year' ? 'BroConf2027' : 'BroConf2026';

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden">
      <BackgroundLayer isEventStarted={isEventStarted} />
      
      <div className="absolute top-4 left-4 md:top-6 md:left-8 lg:top-8 lg:left-12 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#169b62] opacity-90 transition-all duration-1000">
          {titleText}
        </h1>
      </div>

      <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between w-full max-w-7xl mx-auto z-10 gap-12 md:gap-8">
        {!isEventStarted ? (
          <CountdownTimer key={targetDate} targetDate={targetDate} onComplete={() => {}} />
        ) : (
          <div className="text-5xl md:text-8xl font-bold tracking-tighter text-white animate-fade-in uppercase">
            Let's party
          </div>
        )}
        
        <VerseBlock />
      </div>
    </main>
  );
}
