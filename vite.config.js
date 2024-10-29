import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: true,
    includeAssets: ["**/*"],
    pwaAssets: {
      disabled: true,
      config: true,
    },

    manifest: {
      name: 'life005',
      short_name: 'life005',
      description: 'life005',
      theme_color: '#020617',
      background_color:'#020617',
      icons: [
        {
          src: 'assets/192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'assets/512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})