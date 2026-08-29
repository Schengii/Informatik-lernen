import { defineConfig, devices } from '@playwright/test';

// E2E-Tests für zentrale User-Flows + automatisierte Barrierefreiheitsprüfung (axe-core).
// Läuft gegen den Vite-Dev-Server (nicht `vite preview`): der Dev-Server hat eingebautes
// SPA-History-Fallback, ist ohne vorherigen Build startklar und spiegelt exakt den Code in
// src/ wider - für UI-/A11y-Flows ist das ausreichend, ein reiner Produktions-Smoke-Test
// läuft bereits separat über `npm run build` in der CI-Pipeline.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['dot'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    // Siehe vite.config.js: deaktiviert nur die PWA-Dev-Service-Worker-Registrierung für
    // diesen Testlauf, unabhängig vom aktuellen Environment - betrifft nicht `npm run dev`.
    env: { PLAYWRIGHT_TEST: 'true' }
  }
});
