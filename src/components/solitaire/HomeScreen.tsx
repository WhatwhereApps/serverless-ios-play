import { Button } from '@/components/ui/button';
import { Play, Settings, Trophy, Info } from 'lucide-react';

interface HomeScreenProps {
  onNewGame: () => void;
  onContinue?: () => void;
  hasSavedGame?: boolean;
}

export const HomeScreen = ({ onNewGame, onContinue, hasSavedGame }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 flex flex-col items-center justify-center p-6">
      {/* Logo/Title */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-28 bg-white rounded-lg shadow-2xl flex items-center justify-center border-2 border-emerald-300">
            <span className="text-4xl">♠️</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Solitaire</h1>
        <p className="text-emerald-200 text-sm">Classic Klondike</p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {hasSavedGame && onContinue && (
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full h-14 text-lg bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg"
          >
            <Play className="mr-3 h-5 w-5" />
            Continue Game
          </Button>
        )}
        
        <Button
          onClick={onNewGame}
          size="lg"
          variant={hasSavedGame ? "outline" : "default"}
          className={`w-full h-14 text-lg shadow-lg ${
            hasSavedGame 
              ? "border-emerald-400 text-emerald-100 hover:bg-emerald-700/50" 
              : "bg-emerald-500 hover:bg-emerald-400 text-white"
          }`}
        >
          <Play className="mr-3 h-5 w-5" />
          New Game
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full h-14 text-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50"
          disabled
        >
          <Trophy className="mr-3 h-5 w-5" />
          Statistics
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full h-14 text-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50"
          disabled
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full h-14 text-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50"
          disabled
        >
          <Info className="mr-3 h-5 w-5" />
          How to Play
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12">
        <p className="text-emerald-400/60 text-xs">Version 1.0</p>
      </div>
    </div>
  );
};
