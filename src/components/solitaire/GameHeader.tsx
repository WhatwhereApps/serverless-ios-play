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
    <div className="flex items-center justify-between p-4 bg-secondary/50 backdrop-blur-sm rounded-lg border border-border">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-victory-glow" />
          <span className="text-lg font-bold text-foreground">{score}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-semibold text-foreground">{moves}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-mono text-foreground">{formatTime(time)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRestart}
          className="hover:bg-primary hover:text-primary-foreground gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Restart
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onNewGame}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New Game
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