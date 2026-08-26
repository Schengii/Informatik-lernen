import { test, expect } from '@playwright/test';
import { completeOnboarding } from './helpers.js';

test.describe('Onboarding', () => {
  test('a fresh visit loads the dashboard with the default beginner role and the first-visit tour', async ({ page }) => {
    await page.goto('/');

    // initialProfileState.role defaults to 'anfaenger' (utils/storage.js), so the app is
    // usable immediately without forcing a role choice first - only the one-time tour blocks.
    await expect(page.getByText('Schnellsuche mit Strg + K')).toBeVisible();
    await page.getByText('Überspringen').click();

    await expect(page.getByText('Willkommen zurück,')).toBeVisible();
    await expect(page.getByText(/IT-Einsteiger & Neugierige/)).toBeVisible();
  });

  test('the first-visit tour is not shown again after being dismissed', async ({ page }) => {
    await completeOnboarding(page);
    await expect(page.getByText('Schnellsuche mit Strg + K')).not.toBeVisible();

    // Persisted via userState.hasSeenTour, so a reload must not bring it back.
    await page.reload();
    await expect(page.getByText('Schnellsuche mit Strg + K')).not.toBeVisible();
  });

  test('changing the profile role via the Navbar dropdown updates the dashboard', async ({ page }) => {
    await completeOnboarding(page);
    await expect(page.getByText(/IT-Einsteiger & Neugierige/)).toBeVisible();

    await page.getByTitle('Profil, Level & Einstellungen').click();
    await page.getByText('Rolle ändern').click();

    // 'anfaenger' (the default role) is already selected and shows "Aktiv Ausgewählt"
    // instead of "Dieses Profil wählen", so the first match here is the next role in the
    // list ('azubi') - a genuine change, not re-selecting the same role.
    await page.getByText('Dieses Profil wählen').first().click();

    await expect(page.getByText(/IT-Auszubildender/)).toBeVisible();
    await expect(page.getByText(/IT-Einsteiger & Neugierige/)).not.toBeVisible();
  });
});
