import type { CSSProperties } from 'react';

interface FloatingHeartsProps {
  count?: number;
  /** z-index layer. Lower sits behind content. */
  layer?: number;
  /** Palette of soft heart colors. */
  colors?: string[];
  /** Whether hearts should fill the whole viewport (fixed) or just a container (absolute). */
  fixed?: boolean;
}

interface HeartConfig {
  left: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
  drift: number;
}

const DEFAULT_COLORS = [
  'rgba(229,135,159,0.9)', // blush
  'rgba(143,116,191,0.85)', // lavender
  'rgba(111,168,212,0.85)', // sky
  'rgba(240,169,187,0.9)', // soft pink
];

function makeHearts(count: number, colors: string[]): HeartConfig[] {
  const arr: HeartConfig[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      left: `${(i * 97) % 100}%`,
      size: 10 + ((i * 7) % 14),
      delay: (i * 1.3) % 9,
      duration: 8 + ((i * 5) % 6),
      color: colors[i % colors.length],
      drift: ((i % 5) - 2) * 8,
    });
  }
  return arr;
}

function Heart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-6.7-4.35-9.5-8.5C.6 9.6 1.8 6 5 6c2 0 3.2 1.2 4 2.3C9.8 7.2 11 6 13 6c3.2 0 4.4 3.6 2.5 6.5C18.7 16.65 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Subtle floating hearts that drift upward and fade.
 */
export default function FloatingHearts({
  count = 14,
  layer = 15,
  colors = DEFAULT_COLORS,
  fixed = true,
}: FloatingHeartsProps) {
  const hearts = makeHearts(count, colors);
  const positionClass = fixed ? 'fixed inset-0' : 'absolute inset-0';
  const style: CSSProperties = { zIndex: layer };
  return (
    <div
      className={`pointer-events-none ${positionClass} overflow-hidden`}
      style={style}
      aria-hidden="true"
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] animate-floatHeart"
          style={{
            left: h.left,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            ['--drift' as string]: `${h.drift}px`,
          }}
        >
          <Heart size={h.size} color={h.color} />
        </span>
      ))}
    </div>
  );
}
