import FloatingHearts from './FloatingHearts';

interface FinalScreenProps {
  date: Date;
}

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
] as const;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function formatLong(d: Date) {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/**
 * Screen 5 — the final invitation card. Everything fades in smoothly.
 */
export default function FinalScreen({ date }: FinalScreenProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
      {/* Extra hearts layered just for this final moment */}
      <FloatingHearts count={18} layer={12} />

      <div className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-[34px] px-8 py-14 text-center sm:px-14 sm:py-20">
        <p
          className="shimmer-text font-display text-4xl tracking-wide sm:text-6xl"
          style={{ animation: 'fadeIn 1.4s ease forwards, shimmer 5s linear infinite' }}
        >
          Jackson <span className="text-sky-200">💙</span> Eliza
        </p>

        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

        <div className="mt-8 space-y-4">
          <p
            className="animate-fadeInUp font-body text-lg text-white/90 sm:text-xl"
            style={{ animationDelay: '0.4s' }}
          >
            I&rsquo;m really excited to spend this day with you.
          </p>
          <p
            className="animate-fadeInUp font-body text-lg text-white/90 sm:text-xl"
            style={{ animationDelay: '0.7s' }}
          >
            I can&rsquo;t wait to make another beautiful memory together.
          </p>
          <p
            className="animate-fadeInUp font-body text-lg text-white/90 sm:text-xl"
            style={{ animationDelay: '1s' }}
          >
            Thank you for saying yes.
          </p>
          <p
            className="animate-fadeInUp font-display text-2xl text-white sm:text-3xl"
            style={{ animationDelay: '1.3s' }}
          >
            I love you. <span className="text-sky-200">💙</span>
          </p>
        </div>

        {/* The selected date, displayed beautifully */}
        <div
          className="animate-fadeInUp mt-10"
          style={{ animationDelay: '1.6s' }}
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-white/60">
            Our next date
          </p>
          <p className="mt-3 font-display text-3xl text-white sm:text-4xl">
            {formatLong(date)}
          </p>
        </div>
      </div>
    </div>
  );
}
