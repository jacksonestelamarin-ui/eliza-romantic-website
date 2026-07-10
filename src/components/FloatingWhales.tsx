import Whale from './Whale';

interface FloatingWhalesProps {
  count?: number;
}

interface WhaleConfig {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  flip?: boolean;
}

const WHALES: WhaleConfig[] = [
  { top: '14%', left: '8%', size: 84, delay: 0, duration: 24, opacity: 0.22 },
  { top: '30%', left: '78%', size: 66, delay: 3, duration: 28, opacity: 0.18, flip: true },
  { top: '66%', left: '14%', size: 72, delay: 6, duration: 30, opacity: 0.2, flip: true },
  { top: '74%', left: '72%', size: 58, delay: 9, duration: 26, opacity: 0.16 },
  { top: '48%', left: '44%', size: 50, delay: 4, duration: 32, opacity: 0.14 },
];

/**
 * A small fleet of muted blue-gray whales that float slowly across the page.
 * Positioned fixed so they stay visible across all screens.
 */
export default function FloatingWhales({ count = WHALES.length }: FloatingWhalesProps) {
  const whales = WHALES.slice(0, count);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {whales.map((w, i) => (
        <div
          key={i}
          className="absolute animate-floatWhale"
          style={{
            top: w.top,
            left: w.left,
            animationDelay: `${w.delay}s`,
            animationDuration: `${w.duration}s`,
            opacity: w.opacity,
          }}
        >
          <Whale
            className="text-whale"
            style={{
              width: w.size,
              height: 'auto',
              transform: w.flip ? 'scaleX(-1)' : undefined,
            }}
          />
        </div>
      ))}
    </div>
  );
}
