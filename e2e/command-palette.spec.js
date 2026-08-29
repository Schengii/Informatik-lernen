import { test, expect } from '@playwright/test';
import { completeOnboarding } from './helpers.js';

test.describe('Command Palette', () => {
  test('Ctrl+K opens the palette, searching a lab description navigates to it', async ({ page }) => {
    await completeOnboarding(page);

    await page.keyboard.press('Control+k');
    const searchInput = page.getByPlaceholder(/Suche/i);
    await expect(searchInput).toBeVisible();

    // "Kosinus" only appears in the Vector Search lab's LAB_REGISTRY description, not in its
    // curated title - this is the exact search-scope fix covered by the CommandPaletteModal
    // unit test, exercised here end-to-end against the real URL/route.
    await searchInput.fill('Kosinus');
    await page.getByText('Local RAG Vector Database & Embedding Explorer').click();

    await expect(page).toHaveURL(/\/vector_search$/);
    await expect(page.getByRole('heading', { name: /Local RAG Vector Database/ })).toBeVisible();
  });

  test('closes on Escape without navigating away', async ({ page }) => {
    await completeOnboarding(page);
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder(/Suche/i)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder(/Suche/i)).not.toBeVisible();
    await expect(page).toHaveURL(/\/dashboard$|\/$/);
  });
});
