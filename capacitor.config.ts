import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.app',
  appName: 'Solitaire Game',
  webDir: 'dist',
  server: {
    url: "https://7c6dd965-5ba3-4b9c-a2f7-d483a7634a6d.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;