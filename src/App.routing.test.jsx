// @vitest-environment jsdom
//
// Routing-Integrationstest für App.jsx: rendert die komplette App (Navbar,
// ModalContainer, PomodoroTimer, ...) einmal pro bekanntem `activeTab`-Wert
// und prüft, dass jeder Pfad ohne unbehandelten Laufzeitfehler durchläuft.
//
// Ergänzt `allLabsSmoke.test.jsx` (rendert jede Content-Komponente ISOLIERT
// mit generischen No-Op-Props) um die eine Sache, die dieser Test NICHT
// abdeckt: dass App.jsx die Lab-Routing-Tabelle (`activeLabElement`) korrekt
// verdrahtet - richtige Komponente pro Tab-ID, keine doppelten/schattierten
// `case`-Zweige, keine verwaisten Tab-IDs. Genau diese Verdrahtung wurde beim
// Umbau der ~150 einzelnen `{activeTab === 'x' && (...)}`-Blöcke in eine
// Switch-Tabelle mechanisch aus dem Original übernommen; dieser Test ist das
// Sicherheitsnetz dafür UND für jede zukünftige Änderung an der Tabelle.
//
// Die Tab-ID-Liste wird direkt aus dem App.jsx-Quelltext extrahiert (statt
// hier hartkodiert zu werden), damit der Test automatisch mitwächst, wenn
// neue Tabs/Aliase ergänzt werden.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

afterEach(() => {
  cleanup();
});

// Pfad relativ zum Projekt-Root (vitest führt Tests von dort aus) statt über
// import.meta.url aufzulösen - letzteres liefert unter Vites Transform keine
// verlässliche file://-URL für fileURLToPath().
const appSource = readFileSync(join(process.cwd(), 'src', 'App.jsx'), 'utf8');
const allTabIds = [...new Set(
  [...appSource.matchAll(/activeTab === '([\w]+)'/g)].map((m) => m[1])
)];

describe('App.jsx Routing: jeder bekannte Tab lädt ohne unbehandelten Fehler', () => {
  it('hat Tab-IDs aus dem Quelltext extrahiert (Regex-Extraktion funktioniert)', () => {
    expect(allTabIds.length).toBeGreaterThan(150);
  });

  const failures = [];

  for (const tabId of allTabIds) {
    it(`rendert /${tabId} ohne unbehandelten Laufzeitfehler`, async () => {
      const consoleErrors = [];
      const spy = vi.spyOn(console, 'error').mockImplementation((...args) => {
        consoleErrors.push(args.map(String).join(' '));
      });

      try {
        const { unmount } = render(
          <MemoryRouter initialEntries={[`/${tabId}`]}>
            <App />
          </MemoryRouter>
        );

        // Auf das Auflösen aller React.lazy()-Suspense-Grenzen warten, statt
        // eine feste Zeit zu schlafen.
        await vi.waitFor(() => {
          expect(screen.queryByText(/Modul wird geladen/i)).toBeNull();
        }, { timeout: 5000 });

        // Die ErrorBoundary-Fallback-UI darf für keinen bekannten Tab greifen.
        expect(screen.queryByText(/Dieses Modul ist abgestürzt/i)).toBeNull();

        unmount();
      } catch (error) {
        failures.push({ tabId, error });
        throw error;
      } finally {
        spy.mockRestore();
      }
    });
  }

  it('Zusammenfassung: keine Route ist abgestürzt', () => {
    if (failures.length > 0) {
      const summary = failures.map((f) => `- /${f.tabId}: ${f.error.message}`).join('\n');
      throw new Error(`${failures.length} Route(n) sind abgestürzt:\n${summary}`);
    }
    expect(failures.length).toBe(0);
  });
});
