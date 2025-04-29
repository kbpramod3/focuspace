import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'FocusPace',
        short_name: 'FocusPace',
        description: 'A Pomodoro timer and focus tracker',
        theme_color: '#0d9488',
        icons: [
          {
            src: 'pwa-192x192.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
