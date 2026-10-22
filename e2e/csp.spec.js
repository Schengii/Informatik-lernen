import { test, expect } from '@playwright/test';

// `vite preview` liefert die Header aus vercel.json aus (siehe vite.config.js,
// `preview.headers`). Diese Tests stellen sicher, dass die Features, die
// Skripte, Frames oder Worker nachladen, mit der Produktions-CSP funktionieren.
// Ein CSP-Verstoß erscheint als `securitypolicyviolation`-Event.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.__cspViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      window.__cspViolations.push(`${event.violatedDirective} -> ${event.blockedURI}`);
    });
  });
});

const violations = (page) => page.evaluate(() => window.__cspViolations);

test('Antwort enthält die CSP aus vercel.json', async ({ page }) => {
  const response = await page.goto('/');
  expect(response.headers()['content-security-policy']).toContain("default-src 'self'");
});

test('Code-Sandbox läuft unter der Produktions-CSP ohne Verstoß', async ({ page }) => {
  await page.goto('/coding_challenges');
  await page.getByRole('button', { name: 'Code Testen' }).click();
  await expect(page.getByText('ALLE TESTFÄLLE BESTANDEN')).toBeVisible();
  expect(await violations(page)).toEqual([]);
});

test('Video-Player (YouTube-Embed) wird von der CSP nicht blockiert', async ({ page }) => {
  await page.goto('/videos');
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toBeVisible();
  expect(await violations(page)).toEqual([]);
});

test('Monaco-Editor lädt unter der Produktions-CSP ohne Verstoß', async ({ page }) => {
  await page.goto('/monaco_studio');
  // Der Editor rendert erst nach erfolgreichem Laden der Monaco-Skripte.
  await expect(page.locator('.monaco-editor').first()).toBeVisible({ timeout: 20000 });
  expect(await violations(page)).toEqual([]);
});
