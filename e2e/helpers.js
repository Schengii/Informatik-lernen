// Shared setup for E2E specs. `initialProfileState.role` (utils/storage.js) already defaults
// to 'anfaenger', so RoleSelectionModal does NOT block a fresh visit - the only thing that
// reliably appears on every fresh browser context is FirstVisitTourOverlay
// (userState.hasSeenTour defaults to false). Every spec needs that dismissed before testing
// anything else it might visually cover.
export async function completeOnboarding(page) {
  await page.goto('/');

  // Playwright's auto-waiting handles the brief render delay; if this ever times out it
  // means the tour itself broke, which is worth failing loudly on rather than swallowing.
  await page.getByText('Überspringen').click({ timeout: 5000 });
}
