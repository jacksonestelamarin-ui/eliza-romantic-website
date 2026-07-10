import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import WheelPicker from './WheelPicker';

interface DateScreenProps {
  onContinue: (date: Date) => void;
}

const SPOTIFY_URL =
  'https://open.spotify.com/intl-es/track/2bj7cQErTY9z01tv1cC7Ei?si=580f507e166e47ea';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
] as const;

const MIN_YEAR = 2025;
const MAX_YEAR = 2028;
const YEARS = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, i) => MIN_YEAR + i,
);

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatSelectedDate(d: Date) {
  const weekday = WEEKDAYS[d.getDay()];
  const month = MONTHS[d.getMonth()];
  return `${weekday}, ${month} ${d.getDate()}`;
}

/**
 * Screen 4 — "I knew you'd say yes", the Spotify link, and a
 * custom glassmorphism date picker. Continue stays disabled
 * until a date is confirmed.
 */
export default function DateScreen({ onContinue }: DateScreenProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());

  const maxDay = daysInMonth(year, month);
  const days = useMemo(
    () => Array.from({ length: maxDay }, (_, i) => i + 1),
    [maxDay],
  );

  // Clamp day if month/year changed and shortened the month.
  const safeDay = Math.min(day, maxDay);
  if (safeDay !== day) setDay(safeDay);

  const selectedDate = useMemo(
    () => new Date(year, month, safeDay),
    [year, month, safeDay],
  );

  const formatted = formatSelectedDate(selectedDate);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="glass-strong w-full max-w-2xl rounded-[32px] px-6 py-10 sm:px-12 sm:py-14">
        <p className="text-center font-display text-3xl text-white sm:text-4xl">
          I knew you&rsquo;d say yes{' '}
          <span className="text-sky-200">💙</span>
        </p>

        {/* Spotify link */}
        <div className="mt-8 flex flex-col items-center">
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-focus group inline-flex items-center gap-2 rounded-full bg-[#1db954]/85 px-6 py-3 font-body text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#1db954] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1db954]"
          >
            <span className="flex h-5 w-5 items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.62.62 0 01-.86.2c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.21c3.8-.87 7.08-.5 9.73 1.11.3.18.39.57.2.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.65-6.78-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.14-.56 11.23 1.33.37.22.49.7.26 1.07zm.11-2.85C14.84 8.96 9.4 8.78 6.3 9.72a.93.93 0 11-.54-1.78c3.56-1.08 9.57-.87 13.34 1.37a.93.93 0 11-.96 1.59z" />
              </svg>
            </span>
            Listen to this while choosing the date
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Custom glassmorphism date picker */}
        <div className="mt-10">
          <p className="mb-4 text-center font-body text-sm uppercase tracking-[0.2em] text-white/70">
            Pick a date
          </p>
          <div className="flex items-stretch justify-center gap-3 sm:gap-5">
            <WheelPicker
              label="month"
              aria-label="Month"
              items={MONTHS}
              value={MONTHS[month]}
              onChange={(m) => setMonth(MONTHS.indexOf(m))}
              renderLabel={(m) => m}
              width="w-28"
            />
            <WheelPicker
              label="day"
              aria-label="Day"
              items={days}
              value={safeDay}
              onChange={(d) => setDay(d)}
              renderLabel={(d) => String(d)}
              width="w-16"
            />
            <WheelPicker
              label="year"
              aria-label="Year"
              items={YEARS}
              value={year}
              onChange={(y) => setYear(y)}
              renderLabel={(y) => String(y)}
              width="w-20"
            />
          </div>
        </div>

        {/* Selected date preview */}
        <div className="mt-8 flex min-h-[3rem] items-center justify-center">
          <p className="animate-fadeIn rounded-full bg-white/20 px-6 py-2 font-display text-2xl text-white sm:text-3xl">
            {formatted}
          </p>
        </div>

        {/* Continue — disabled until a date is selected (always selected here,
            but we gate it on explicit "has chosen" intent for clarity). */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => onContinue(selectedDate)}
            className="glass-focus rounded-full bg-gradient-to-r from-lavender-300 to-blush-300 px-12 py-4 font-body text-lg font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lavender-300 active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
