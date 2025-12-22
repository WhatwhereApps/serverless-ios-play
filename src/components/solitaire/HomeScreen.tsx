import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Settings, Info } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';
import { HowToPlayDialog } from './HowToPlayDialog';
import { GameSettings } from '@/hooks/useGameSettings';
import { useLanguage } from '@/i18n';

interface HomeScreenProps {
  onNewGame: () => void;
  onContinue?: () => void;
  hasSavedGame?: boolean;
  settings: GameSettings;
  onUpdateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
}

export const HomeScreen = ({ 
  onNewGame, 
  onContinue, 
  hasSavedGame,
  settings,
  onUpdateSetting
}: HomeScreenProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 flex flex-col items-center justify-center p-6">
      {/* Logo/Title */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-28 bg-white rounded-lg shadow-2xl flex items-center justify-center border-2 border-emerald-300">
            <span className="text-4xl">♠️</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{t.appTitle}</h1>
        <p className="text-emerald-200 text-sm">{t.subtitle}</p>
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
            {t.continueGame}
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
          {t.newGame}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full h-14 text-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="mr-3 h-5 w-5" />
          {t.settings}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full h-14 text-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50"
          onClick={() => setHowToPlayOpen(true)}
        >
          <Info className="mr-3 h-5 w-5" />
          {t.howToPlay}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12">
        <p className="text-emerald-400/60 text-xs">{t.version}</p>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onUpdateSetting={onUpdateSetting}
      />

      {/* How to Play Dialog */}
      <HowToPlayDialog
        open={howToPlayOpen}
        onOpenChange={setHowToPlayOpen}
      />
    </div>
  );
};
