import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { completeOnboarding } from './helpers.js';

// Automated baseline accessibility check (see README: the app advertises WCAG-oriented
// features like dyslexia font, high-contrast mode and color-blind aid, but had no
// automated check that any of it actually holds up against real WCAG rules). This is a
// baseline, not full manual WCAG coverage - it catches programmatic issues (contrast,
// missing labels, ARIA misuse), not everything a human accessibility audit would.
test.describe('Accessibility (axe-core baseline)', () => {
  test('dashboard has no critical or serious axe violations', async ({ page }) => {
    await completeOnboarding(page);

    const results = await new AxeBuilder({ page })
      .include('body')
      .analyze();

    const seriousOrCritical = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
  });

  test('high-contrast mode toggles without introducing new critical/serious violations', async ({ page }) => {
    await completeOnboarding(page);

    await page.getByTitle('Profil, Level & Einstellungen').click();
    await page.getByLabel('Hoher Kontrast').check();

    const results = await new AxeBuilder({ page }).include('body').analyze();
    const seriousOrCritical = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
  });

  test('a representative lab (subnetting calculator) has no critical or serious axe violations', async ({ page }) => {
    await completeOnboarding(page);
    await page.goto('/subnetting');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).include('body').analyze();
    const seriousOrCritical = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
  });
});
