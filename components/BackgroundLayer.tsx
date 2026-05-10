'use client';

interface BackgroundLayerProps {
  isEventStarted: boolean;
}

export default function BackgroundLayer({ isEventStarted }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#210f02]">
      {/* Before image */}
      <img
        src="/assets/background-before.PNG"
        alt="Background before"
        className="absolute inset-0 w-full h-full object-contain object-top transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isEventStarted ? 0 : 1 }}
      />
      {/* After image */}
      <img
        src="/assets/background-after.PNG"
        alt="Background after"
        className="absolute inset-0 w-full h-full object-contain object-top transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isEventStarted ? 1 : 0 }}
      />
    </div>
  );
}
