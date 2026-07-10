import {
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

interface WheelPickerProps<T> {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Visible rows on each side of the selected one. */
  pad?: number;
  rowHeight?: number;
  width?: string;
  label: string;
  renderLabel: (item: T) => string;
  'aria-label'?: string;
}

const ITEM_HEIGHT = 44;

/**
 * A custom glassmorphism scroll-wheel picker.
 * No native date input is used anywhere.
 * Snaps to the nearest item after the user scrolls.
 */
export default function WheelPicker<T>({
  items,
  value,
  onChange,
  pad = 2,
  rowHeight = ITEM_HEIGHT,
  width = 'w-24',
  label,
  renderLabel,
  ...rest
}: WheelPickerProps<T> & { 'aria-label'?: string }) {
  const ariaLabel = rest['aria-label'] ?? label;
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number | undefined>(undefined);

  const selectedIndex = items.indexOf(value);
  const viewportHeight = rowHeight * (pad * 2 + 1);

  // Keep the wheel scrolled to the selected item when value changes externally.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: selectedIndex * rowHeight, behavior: 'smooth' });
  }, [selectedIndex, rowHeight]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      const idx = Math.round(el.scrollTop / rowHeight);
      const clamped = Math.max(0, Math.min(items.length - 1, idx));
      const snapped = items[clamped];
      if (snapped !== value) onChange(snapped);
      el.scrollTo({ top: clamped * rowHeight, behavior: 'smooth' });
    }, 120);
  };

  // Click / keyboard navigation on a row.
  const selectIndex = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    onChange(items[clamped]);
    el.scrollTo({ top: clamped * rowHeight, behavior: 'smooth' });
  };

  const padRows: ReactNode[] = [];
  for (let i = 0; i < pad; i++) padRows.push(<div key={`top-${i}`} style={{ height: rowHeight }} />);

  return (
    <div
      className={`relative ${width} select-none`}
      style={{ height: viewportHeight }}
      role="group"
      aria-label={ariaLabel}
    >
      {/* Selection highlight band */}
      <div
        className="pointer-events-none absolute left-1 right-1 z-10 rounded-xl border border-white/40 bg-white/25"
        style={{
          top: pad * rowHeight,
          height: rowHeight,
        }}
        aria-hidden
      />

      {/* Top & bottom fade masks */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20"
        style={{
          height: pad * rowHeight,
          background:
            'linear-gradient(to bottom, rgba(250,248,246,0.65), rgba(250,248,246,0))',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        style={{
          height: pad * rowHeight,
          background:
            'linear-gradient(to top, rgba(250,248,246,0.65), rgba(250,248,246,0))',
        }}
        aria-hidden
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="no-scrollbar glass-soft h-full overflow-y-scroll rounded-2xl py-0"
        style={{ scrollSnapType: 'y mandatory' }}
        tabIndex={0}
        aria-label={ariaLabel}
        aria-activedescendant={`wheel-${label}-${selectedIndex}`}
      >
        {padRows}
        {items.map((item, i) => {
          const active = i === selectedIndex;
          return (
            <div
              key={String(item)}
              id={`wheel-${label}-${i}`}
              onClick={() => selectIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  selectIndex(i + 1);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  selectIndex(i - 1);
                }
              }}
              tabIndex={-1}
              style={{
                height: rowHeight,
                scrollSnapAlign: 'center',
                opacity: active ? 1 : 0.5,
                transform: active ? 'scale(1.04)' : 'scale(1)',
              }}
              className={`flex cursor-pointer items-center justify-center font-body transition-all duration-200 ${
                active ? 'text-lavender-500 text-base font-semibold' : 'text-warmgray-400 text-sm'
              }`}
            >
              {renderLabel(item)}
            </div>
          );
        })}
        {padRows}
      </div>
      {/* aria-live region for screen readers */}
      <span className="sr-only" aria-live="polite">
        {renderLabel(value)}
      </span>
    </div>
  );
}
