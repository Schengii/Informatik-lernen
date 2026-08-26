import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.js'],
    // Ohne dies versucht Vitest, die Playwright-Specs in e2e/ (eigenes test/expect aus
    // '@playwright/test', kein Vitest-Import) ebenfalls als Vitest-Tests zu laden, was mit
    // einem Parse-/Import-Fehler fehlschlägt.
    exclude: ['**/node_modules/**', '**/e2e/**']
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        // Deaktiviert unter Playwright (siehe playwright.config.js `webServer.env`): auf
        // Umgebungen mit dem bekannten @rollup/rollup-*-Optional-Dependency-Bug (siehe
        // Fehlermeldung bei `npm run build`) schlägt die Dev-SW-Generierung mit einem 500
        // fehl, was Vites Error-Overlay als klickblockierendes Overlay über der ganzen Seite
        // anzeigt - für den normalen `npm run dev`-Workflow bleibt das Verhalten unverändert.
        enabled: !process.env.PLAYWRIGHT_TEST
      },
      manifest: {
        name: 'IT-DevGame',
        short_name: 'ITGame',
        description: 'Interaktives Informatik-Spiel & Lernplattform',
        theme_color: '#0f172a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    cssMinify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/') || id.includes('node_modules/zustand/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/lucide-react/') || id.includes('node_modules/canvas-confetti/')) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules/recharts/') || id.includes('node_modules/jspdf/') || id.includes('node_modules/alasql/')) {
            return 'vendor-charts-pdf';
          }
        }
      }
    }
  }
})
