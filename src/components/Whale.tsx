import type { CSSProperties } from 'react';

interface WhaleProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * A single small muted blue-gray whale drawn as inline SVG.
 * Same style is reused throughout the site for consistency.
 */
export default function Whale({ className = '', style }: WhaleProps) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {/* Body */}
      <path
        d="M8 44c0-14 18-30 44-30 24 0 40 12 48 24 6 9 8 10 12 9-2 6-8 7-14 6-4 5-14 9-26 9-26 0-64-2-64-18z"
        fill="currentColor"
      />
      {/* Tail */}
      <path
        d="M104 47c6-2 10-1 12 3-5 1-7 3-7 6-3-2-6-3-7-7z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Belly highlight */}
      <path
        d="M18 48c6 6 22 9 40 9 14 0 26-3 32-7-6 8-20 12-36 12-18 0-30-5-36-14z"
        fill="#fff"
        opacity="0.16"
      />
      {/* Eye */}
      <circle cx="30" cy="34" r="2.2" fill="#1c2a36" />
      {/* Smile */}
      <path
        d="M24 40c4 3 9 3 13 0"
        fill="none"
        stroke="#1c2a36"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Water spout */}
      <path
        d="M44 16c0-5 2-8 0-12M50 14c0-4 2-7 0-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
