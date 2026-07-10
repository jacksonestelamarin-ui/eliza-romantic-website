import { useEffect, useState } from 'react';

interface KenBurnsBackgroundProps {
  /** Path to the temple photo in /public. */
  src: string;
  /** Fallback image if the primary src 404s. */
  fallback?: string;
  /** Optional overlay strength (0–1). Light overlay for readability. */
  overlay?: number;
}

/**
 * Full-screen background photo with a very slow Ken Burns zoom
 * and a light dark overlay for text readability. Falls back to a
 * placeholder image if the primary photo is not yet uploaded.
 */
export default function KenBurnsBackground({
  src,
  fallback = '/temple-placeholder.svg',
  overlay = 0.28,
}: KenBurnsBackgroundProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    // Reset when src changes so we re-test availability.
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallback) setImgSrc(fallback);
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-sky-100 via-lavender-50 to-blush-100"
      aria-hidden
    >
      <img
        src={imgSrc}
        alt=""
        onError={handleError}
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(28,26,38,${overlay})` }}
        aria-hidden
      />
      {/* Soft vignette to keep edges calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 40%, transparent 40%, rgba(28,26,38,0.32) 100%)',
        }}
        aria-hidden
      />
    </div>
  );
}
