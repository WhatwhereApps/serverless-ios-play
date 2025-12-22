import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 flex flex-col items-center justify-center z-50">
      {/* Main Title */}
      <div className="text-center space-y-8">
        <h1 className="font-fredoka text-6xl sm:text-8xl text-white drop-shadow-2xl animate-pulse">
          {t.appTitle}
        </h1>
        
        {/* Subtitle */}
        <div className="font-orbitron text-lg sm:text-xl text-white/90 font-bold tracking-[0.3em] uppercase">
          WhatWhere Apps
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 sm:w-80 mx-auto mt-12">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/80 text-sm mt-2 font-orbitron">
            {t.loading} {progress}%
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-white/20 text-4xl animate-spin">♠</div>
      <div className="absolute top-20 right-16 text-white/20 text-3xl animate-bounce">♥</div>
      <div className="absolute bottom-20 left-20 text-white/20 text-3xl animate-pulse">♦</div>
      <div className="absolute bottom-16 right-12 text-white/20 text-4xl animate-spin">♣</div>
    </div>
  );
};