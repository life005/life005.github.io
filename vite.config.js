import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ["**/*"],

    manifest: {
      name: 'life005',
      short_name: 'life005',
      description: 'life005',
      theme_color: '#020617',
      background_color:'#020617',
      icons: [
        {
          src: '192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
    },
    
    workbox: {
      globPatterns: ['**/*'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      runtimeCaching:[
        {
          urlPattern: /\.(?:js|jsx|css|html|png|jpg|jpeg|svg|gif|webp|woff2?|ttf|otf|json|mp4|webm|ogg)$/, // Cache all static assets
          handler: 'CacheFirst', // Use CacheFirst strategy for static assets
          options: {
            cacheName: 'life-os-static-cache',
            expiration: {
              maxEntries: 200, // Maximum number of cached entries
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
            },
          },
        },
      ]
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})