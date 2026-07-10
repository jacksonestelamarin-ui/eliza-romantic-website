interface GreetingScreenProps {
  onContinue: () => void;
}

/**
 * Screen 2 — a soft greeting with a large Continue button.
 */
export default function GreetingScreen({ onContinue }: GreetingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="glass-strong w-full max-w-xl rounded-[28px] px-8 py-12 text-center sm:px-12 sm:py-16">
        <p className="font-display text-3xl leading-snug text-white sm:text-4xl">
          Hi Eliza <span className="text-sky-200">💙</span>,
        </p>
        <p className="mt-6 font-body text-lg text-white/85 sm:text-xl">
          I have a very important question for you…
        </p>

        <button
          onClick={onContinue}
          className="glass-focus group mt-10 inline-flex items-center gap-2 rounded-full bg-white/85 px-10 py-4 font-body text-base font-semibold tracking-wide text-lavender-500 transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lavender-400 active:scale-95"
        >
          Continue
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
