'use client';

interface BackgroundLayerProps {
  isEventStarted: boolean;
}

export default function BackgroundLayer({ isEventStarted }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#210f02]">
      {/* Before image */}
      <img
        src="/assets/background-before.PNG"
        alt="Before event"
        className="absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isEventStarted ? 0 : 1 }}
      />
      {/* After image */}
      <img
        src="/assets/background-after.PNG"
        alt="After event"
        className="absolute top-0 left-0 w-full h-auto transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isEventStarted ? 1 : 0 }}
      />
    </div>
  );
}
