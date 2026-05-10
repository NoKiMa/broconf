'use client';

interface BackgroundLayerProps {
  isEventStarted: boolean;
}

export default function BackgroundLayer({ isEventStarted }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: 'url(/assets/background-before.PNG)',
          opacity: isEventStarted ? 0 : 1,
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: 'url(/assets/background-after.PNG)',
          opacity: isEventStarted ? 1 : 0,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
