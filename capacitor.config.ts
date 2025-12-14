import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.solitaire.master',
  appName: 'Solitaire Master',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0a3d2a',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a3d2a',
    },
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    backgroundColor: '#0a3d2a',
  },
};

export default config;