import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Vibrate } from 'lucide-react';
import { 
  GameSettings, 
  CardBackDesign, 
  VibrationIntensity,
  cardBackDesigns 
} from '@/hooks/useGameSettings';
import { cn } from '@/lib/utils';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: GameSettings;
  onUpdateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
}

const vibrationLabels: Record<VibrationIntensity, string> = {
  off: 'Off',
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
};

const vibrationValues: VibrationIntensity[] = ['off', 'light', 'medium', 'heavy'];

export const SettingsDialog = ({ 
  open, 
  onOpenChange, 
  settings, 
  onUpdateSetting 
}: SettingsDialogProps) => {
  const vibrationIndex = vibrationValues.indexOf(settings.vibrationIntensity);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-emerald-900 border-emerald-700 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl text-emerald-100">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="h-5 w-5 text-emerald-300" />
              ) : (
                <VolumeX className="h-5 w-5 text-emerald-400/50" />
              )}
              <Label htmlFor="sound" className="text-base text-emerald-100">
                Sound Effects
              </Label>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => onUpdateSetting('soundEnabled', checked)}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          {/* Vibration Intensity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Vibrate className="h-5 w-5 text-emerald-300" />
              <Label className="text-base text-emerald-100">
                Vibration: {vibrationLabels[settings.vibrationIntensity]}
              </Label>
            </div>
            <Slider
              value={[vibrationIndex]}
              onValueChange={([value]) => onUpdateSetting('vibrationIntensity', vibrationValues[value])}
              max={3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-emerald-400/70">
              <span>Off</span>
              <span>Light</span>
              <span>Medium</span>
              <span>Heavy</span>
            </div>
          </div>

          {/* Card Back Design */}
          <div className="space-y-3">
            <Label className="text-base text-emerald-100">Card Back Design</Label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.entries(cardBackDesigns) as [CardBackDesign, typeof cardBackDesigns[CardBackDesign]][]).map(
                ([key, design]) => (
                  <button
                    key={key}
                    onClick={() => onUpdateSetting('cardBackDesign', key)}
                    className={cn(
                      "w-full aspect-[2/3] rounded-lg transition-all duration-200",
                      `bg-gradient-to-br ${design.gradient}`,
                      "border-2",
                      settings.cardBackDesign === key
                        ? "ring-2 ring-emerald-400 border-emerald-400 scale-105"
                        : `${design.accent} hover:scale-105`
                    )}
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-white/50 text-xs">♠</span>
                    </div>
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-emerald-400/70 text-center">
              {cardBackDesigns[settings.cardBackDesign].name}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
