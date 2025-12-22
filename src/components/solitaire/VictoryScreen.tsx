import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, RotateCcw } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

interface VictoryScreenProps {
  score: number;
  moves: number;
  time: number;
  onNewGame: () => void;
  onHome: () => void;
}

const CONFETTI_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  '#FFD700',
  '#FF6B6B',
  '#4ECDC4',
  '#A855F7',
  '#F97316',
  '#22C55E',
];

export const VictoryScreen = ({ score, moves, time, onNewGame, onHome }: VictoryScreenProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}

      {/* Victory Card */}
      <div className="relative z-10 bg-card border border-border rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-scale-in max-w-md mx-4">
        {/* Trophy Icon */}
        <div className="text-7xl sm:text-8xl animate-bounce">🏆</div>
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            Congratulations!
          </h1>
          <p className="text-muted-foreground text-lg">You won the game!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-primary">{score}</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Score</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-primary">{moves}</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Moves</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-primary">{formatTime(time)}</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">Time</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={onHome}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            onClick={onNewGame}
            className="flex-1 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};
