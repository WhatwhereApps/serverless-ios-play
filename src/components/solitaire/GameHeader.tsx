import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Clock, Target, Home } from 'lucide-react';
import { useLanguage } from '@/i18n';

interface GameHeaderProps {
  score: number;
  moves: number;
  time: number;
  onNewGame: () => void;
  onRestart: () => void;
  onHome: () => void;
  isWon: boolean;
}

export const GameHeader = ({ score, moves, time, onNewGame, onRestart, onHome, isWon }: GameHeaderProps) => {
  const { t } = useLanguage();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-2 p-3 sm:p-5 pt-safe-area-inset-top mt-6 sm:mt-4">
      {/* Buttons row - above everything, aligned right */}
      <div className="flex items-center justify-between gap-1 sm:gap-3">
        {/* Home button on left */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onHome}
          className="gap-1 text-xs sm:text-sm px-2 sm:px-3"
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{t.menu}</span>
        </Button>

        {/* Right side buttons */}
        <div className="flex items-center gap-1 sm:gap-3">

        <Button
          variant="outline"
          size="sm"
          onClick={onRestart}
          className="hover:bg-primary hover:text-primary-foreground gap-1 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{t.restart}</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onNewGame}
          className="gap-1 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{t.new}</span>
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="flex items-center gap-1 sm:gap-2">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-victory-glow" />
          <span className="text-sm sm:text-lg font-bold text-foreground">{score}</span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <span className="text-sm sm:text-lg font-semibold text-foreground">{moves}</span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <span className="text-sm sm:text-lg font-mono text-foreground">{formatTime(time)}</span>
        </div>
      </div>

      {isWon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl font-bold text-victory-glow animate-victory-pulse">
            {t.youWon}
          </div>
        </div>
      )}
    </div>
  );
};