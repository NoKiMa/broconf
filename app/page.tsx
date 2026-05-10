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

      if (now >= end) setEventPhase('next_year');
      else if (now >= start) setEventPhase('party');
      else setEventPhase('upcoming');
    };

    checkPhase();
    const interval = setInterval(checkPhase, 1000);
    return () => clearInterval(interval);
  }, []);

  const isEventStarted = eventPhase === 'party';
  const targetDate = eventPhase === 'next_year' ? EVENT_DATE_NOW : EVENT_DATE;
  const titleText = eventPhase === 'next_year' ? 'BroConf2027' : 'BroConf2026';

  return (
    <main className="relative h-screen w-full bg-[#210f02] overflow-hidden">
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <BackgroundLayer isEventStarted={isEventStarted} />
      </div>

      {/* ── Title: Overlaid top-left ── */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 z-20">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#169b62] drop-shadow-2xl">
          {titleText}
        </h1>
      </div>

      {/* ── Bottom Content: Timer and Verse ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex justify-center md:justify-start">
          {!isEventStarted ? (
            <CountdownTimer key={targetDate} targetDate={targetDate} onComplete={() => {}} />
          ) : (
            <div className="text-5xl md:text-8xl font-bold tracking-tighter text-white animate-fade-in uppercase">
              Let's party
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <VerseBlock />
        </div>
      </div>

    </main>
  );
}
