import { useCallback, useEffect, useState } from 'react';
import KenBurnsBackground from './components/KenBurnsBackground';
import FloatingWhales from './components/FloatingWhales';
import FloatingHearts from './components/FloatingHearts';
import LoadingScreen from './components/LoadingScreen';
import GreetingScreen from './components/GreetingScreen';
import QuestionScreen from './components/QuestionScreen';
import DateScreen from './components/DateScreen';
import FinalScreen from './components/FinalScreen';

type Screen = 'loading' | 'greeting' | 'question' | 'date' | 'final';

export default function App() {
  const [screen, setScreen] = useState<Screen>('loading');
  const [shown, setShown] = useState<Screen | null>('loading');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setShown(null);
    const t = setTimeout(() => setShown(screen), 380);
    return () => clearTimeout(t);
  }, [screen]);

  const go = useCallback((next: Screen) => setScreen(next), []);

  const handleContinueToDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setScreen('final');
  }, []);

  return (
    <main className="relative min-h-screen w-full font-body text-white">
      <KenBurnsBackground
       src="/temple.jpg"
        fallback="/temple-placeholder.svg"
        overlay={0.3}
      />
      <FloatingWhales />
      <FloatingHearts count={12} layer={8} />

      <div
        key={screen}
        className={`transition-opacity duration-500 ${
          shown === screen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {shown === screen && screen === 'loading' && (
          <LoadingScreen onDone={() => go('greeting')} />
        )}
        {shown === screen && screen === 'greeting' && (
          <GreetingScreen onContinue={() => go('question')} />
        )}
        {shown === screen && screen === 'question' && (
          <QuestionScreen onYes={() => go('date')} />
        )}
        {shown === screen && screen === 'date' && (
          <DateScreen onContinue={handleContinueToDate} />
        )}
        {shown === screen && screen === 'final' && selectedDate && (
          <FinalScreen date={selectedDate} />
        )}
      </div>
    </main>
  );
}
