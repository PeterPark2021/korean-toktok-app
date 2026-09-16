import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  onPlay: (text: string) => void;
  isPlaying?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  onPlay,
  isPlaying = false,
  size = 'md',
  className = '',
  disabled = false,
  label
}) => {
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 22
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onPlay(text);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={isPlaying ? '음성 재생 중' : '발음 듣기 (TTS)'}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
        isPlaying
          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105 ring-2 ring-rose-300'
          : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 active:scale-95 border border-rose-200/60'
      } ${sizeClasses[size]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {isPlaying ? (
        <div className="flex items-center gap-0.5 px-0.5">
          <span className="w-1 bg-white rounded-full animate-wave-1 h-3"></span>
          <span className="w-1 bg-white rounded-full animate-wave-2 h-4"></span>
          <span className="w-1 bg-white rounded-full animate-wave-3 h-2"></span>
        </div>
      ) : (
        <Volume2 size={iconSizes[size]} className="transition-transform group-hover:scale-110" />
      )}
      {label && <span className="font-medium text-xs pr-1">{label}</span>}
    </button>
  );
};
