import React, { useId } from 'react';

interface WorthItLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  iconOnly?: boolean;
  animated?: boolean;
}

export const WorthItLogo: React.FC<WorthItLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  className = '',
  iconOnly = false,
  animated = false,
}) => {
  const gradientId = useId().replace(/:/g, '');

  let pixelSize = 36;
  if (typeof size === 'number') {
    pixelSize = size;
  } else {
    switch (size) {
      case 'sm':
        pixelSize = 28;
        break;
      case 'md':
        pixelSize = 36;
        break;
      case 'lg':
        pixelSize = 44;
        break;
      case 'xl':
        pixelSize = 52;
        break;
    }
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon Container */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-200 ${
          animated ? 'hover:scale-105' : ''
        }`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg
          viewBox="0 0 48 48"
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`worthit-grad-${gradientId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          {/* Price Tag Vector Shape */}
          <path
            d="M 15 7 L 27 7 C 29 7 30.5 7.8 31.5 8.8 L 41.2 18.5 C 43.2 20.5 43.2 23.8 41.2 25.8 L 27.8 39.2 C 25.8 41.2 22.5 41.2 20.5 39.2 L 8.8 27.5 C 7.8 26.5 7 25 7 23 L 7 15 C 7 10.6 10.6 7 15 7 Z"
            fill={`url(#worthit-grad-${gradientId})`}
          />

          {/* Tag Hole Ring */}
          <circle cx="16" cy="16" r="3.2" fill="#FFFFFF" opacity="0.95" />
          <circle cx="16" cy="16" r="1.8" fill="#4338CA" />

          {/* Integrated AI Circuit Lines */}
          <path
            d="M 16 16 L 24 24 L 33 24 M 24 24 L 24 33 L 30 33"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Circuit Connection Nodes */}
          <circle cx="24" cy="24" r="2.2" fill="#FFFFFF" />
          <circle cx="33" cy="24" r="2.5" fill="#6EE7B7" />
          <circle cx="30" cy="33" r="2.2" fill="#93C5FD" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {!iconOnly && showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
              WorthIt<span className="text-indigo-600 dark:text-indigo-400">.AI</span>
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1">
              Think Before You Spend
            </span>
          )}
        </div>
      )}
    </div>
  );
};
