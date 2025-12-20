import { useState, useEffect, useCallback } from 'react';

export type CardBackDesign = 'classic-blue' | 'classic-red' | 'royal-purple' | 'forest-green' | 'midnight';
export type VibrationIntensity = 'off' | 'light' | 'medium' | 'heavy';

export interface GameSettings {
  soundEnabled: boolean;
  vibrationIntensity: VibrationIntensity;
  cardBackDesign: CardBackDesign;
}

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  vibrationIntensity: 'medium',
  cardBackDesign: 'classic-blue',
};

const STORAGE_KEY = 'solitaire-settings';

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // Ignore parse errors
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage errors
    }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSetting,
    resetSettings,
  };
};

// Card back design configurations
export const cardBackDesigns: Record<CardBackDesign, { name: string; gradient: string; accent: string }> = {
  'classic-blue': {
    name: 'Classic Blue',
    gradient: 'from-blue-900 to-blue-700',
    accent: 'border-blue-400/30',
  },
  'classic-red': {
    name: 'Classic Red',
    gradient: 'from-red-900 to-red-700',
    accent: 'border-red-400/30',
  },
  'royal-purple': {
    name: 'Royal Purple',
    gradient: 'from-purple-900 to-purple-700',
    accent: 'border-purple-400/30',
  },
  'forest-green': {
    name: 'Forest Green',
    gradient: 'from-emerald-900 to-emerald-700',
    accent: 'border-emerald-400/30',
  },
  'midnight': {
    name: 'Midnight',
    gradient: 'from-slate-900 to-slate-700',
    accent: 'border-slate-400/30',
  },
};
