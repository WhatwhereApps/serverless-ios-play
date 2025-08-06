import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Clock, Target } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  moves: number;
  time: number;
  onNewGame: () => void;
  onRestart: () => void;
  isWon: boolean;
}

export const GameHeader = ({ score, moves, time, onNewGame, onRestart, isWon }: GameHeaderProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between p-2 sm:p-4 pt-safe-area-inset-top bg-secondary/50 backdrop-blur-sm rounded-lg border border-border mt-4 sm:mt-2">
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

      <div className="flex items-center gap-1 sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRestart}
          className="hover:bg-primary hover:text-primary-foreground gap-1 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Restart</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onNewGame}
          className="gap-1 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">New Game</span>
        </Button>
      </div>

      {isWon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-6xl font-bold text-victory-glow animate-victory-pulse">
            YOU WON!
          </div>
        </div>
      )}
    </div>
  );
};