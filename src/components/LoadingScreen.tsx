import { useEffect, useState } from 'react';
import Whale from './Whale';

interface LoadingScreenProps {
  onDone: () => void;
}

/**
 * Screen 1 — a calm loading screen that fades out after ~2s.
 */
export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 1900);
    const doneTimer = setTimeout(onDone, 2700);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 transition-opacity duration-700 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <Whale
        className="text-whale animate-breathe"
        style={{ width: 96, opacity: 0.55 }}
      />
      <p className="mt-8 font-display text-2xl sm:text-3xl text-white/90 tracking-wide">
        Initializing surprise<span className="animate-softPulse">...</span>
      </p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-lavender-200 via-blush-300 to-sky-200"
          style={{
            animation: 'loadbar 2s ease forwards',
            width: '100%',
            transformOrigin: 'left',
          }}
        />
      </div>
      <span className="sr-only">Initializing surprise</span>

      <style>{`@keyframes loadbar{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}`}</style>
    </div>
  );
}
