import { useCallback, useRef, useState } from 'react';

interface QuestionScreenProps {
  onYes: () => void;
}

const NO_MESSAGES = [
  '🐋 Every whale says yes.',
  '💙 Come on... you know you want to.',
  '🥹 Pretty please?',
  '😂 Nice try.',
  '😏 That button doesn\u2019t really work.',
  '💙 I already know your answer.',
  '🥰 Okay... you win.',
];

const MAX_ESCAPES = 7;

interface Position {
  top: string;
  left: string;
}

function randomPosition(): Position {
  // Keep it within a safe, readable band (avoid extreme edges).
  const top = 18 + Math.random() * 55; // 18% – 73%
  const left = 12 + Math.random() * 68; // 12% – 80%
  return { top: `${top}%`, left: `${left}%` };
}

/**
 * Screen 3 — the big question. The NO button escapes 7 times,
 * showing one different message each time, then disappears.
 */
export default function QuestionScreen({ onYes }: QuestionScreenProps) {
  const [escapes, setEscapes] = useState(0);
  const [pos, setPos] = useState<Position | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [noGone, setNoGone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const escapingRef = useRef(false);

  const escape = useCallback(() => {
    if (noGone || escapingRef.current) return;

    // On the 7th escape, the button disappears after showing the final message.
    if (escapes >= MAX_ESCAPES - 1) {
      setMessage(NO_MESSAGES[escapes]);
      setNoGone(true);
      return;
    }

    escapingRef.current = true;
    setMessage(NO_MESSAGES[escapes]);
    setPos(randomPosition());
    setEscapes((e) => e + 1);

    // Brief lock so the move settles before the next trigger.
    window.setTimeout(() => {
      escapingRef.current = false;
    }, 90);
  }, [escapes, noGone]);

  const handleNoInteraction = useCallback(() => {
    // Treat hover (desktop) or touch/click (mobile) as an escape attempt.
    escape();
  }, [escape]);

  const noButtonStyle = pos
    ? {
        position: 'fixed' as const,
        top: pos.top,
        left: pos.left,
        transform: 'translate(-50%, -50%)',
      }
    : {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="glass-strong w-full max-w-xl rounded-[28px] px-8 py-12 text-center sm:px-12 sm:py-16">
        <p className="font-display text-3xl leading-snug text-white sm:text-4xl">
          Would you like to go on another date with me?{' '}
          <span className="text-sky-200">💙</span>
        </p>

        {/* Message that appears above the buttons on each escape */}
        <div className="mt-8 flex min-h-[2.5rem] items-center justify-center">
          {message && (
            <p
              key={message}
              className="animate-fadeInDown rounded-full bg-white/20 px-5 py-2 font-body text-base text-white/95 sm:text-lg"
            >
              {message}
            </p>
          )}
        </div>

        {/* Button row */}
        <div className="relative mt-8 flex items-center justify-center gap-5">
          <button
            onClick={onYes}
            className="glass-focus rounded-full bg-gradient-to-r from-sky-300 to-lavender-300 px-12 py-4 font-body text-lg font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-300 active:scale-95"
          >
            YES
          </button>

          {!noGone && (
            <button
              onClick={handleNoInteraction}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onFocus={handleNoInteraction}
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={noButtonStyle}
              className={`glass-focus select-none rounded-full border border-white/40 bg-white/15 px-10 py-4 font-body text-lg font-semibold tracking-wide text-white/80 transition-all duration-200 ease-out ${
                hovered ? 'scale-95' : ''
              }`}
              aria-label="No"
            >
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
