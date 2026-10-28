# PLAN.md – Informatik-lernen (IT-DevGame)

> **Einzige Arbeitsgrundlage** für Umsetzung und Tests.  
> Stand: 2026-10-28 · Branch `chore/cleanup` (noch nicht in `main` gemergt)

---

## 1. Ist-Zustand

- **Stack**: React 19, Vite 8 (Rolldown), Zustand 5 + localStorage + BroadcastChannel, TailwindCSS 4, Oxlint 1.88, Vitest 5, Playwright 1.64, PWA (Workbox)
- **Umfang**: 252 Content-Labs (`src/components/Content/*.jsx`), 177 Utils-Engines, 177 Unit-Test-Dateien, 23 Komponenten-Tests
- **Build**: `npm run build` ✅ ~13 s; `npm run lint:ci` 0 Fehler/Warnungen; `npm run typecheck` 0 Fehler
- **Tests**: `npm run test:fast` → 1 223 Tests bestanden; 5 Utils ohne Unit-Tests; ~229 Labs nur über generischen Smoke-Test
- **Coverage** (Baseline 07.10.2026, vite.config.js): Statements 61,9 % · Branches 53,6 % · Functions 47,1 % · Lines 63,5 % – knapp über Schwellwerten (60/52/45/62)
- **CI/CD**: GitHub Actions – `lint:ci → typecheck → test → coverage → build → size → e2e + Lighthouse`; Actions nur major-gepinnt (kein SHA-Pinning)
- **Sicherheit**: Pre-Commit-Hook ✅; `.gitleaks.toml` ✅; `jwtConfusionEngine.js` Mock-RSA-Key im Allowlist
- **Technische Schulden**: `Navbar.jsx` 901 Zeilen; `labModulesData.js` 2 432 Zeilen; Vitest läuft mit `isolate: true` (langsam)
- **Offen**: Branch `chore/cleanup` (2 Commits) noch nicht in `main` gemergt

---

## 2. Maßnahmen

### Phase 1 – Sofort (Hygiene & Unblocking)

- [x] **M01** | Branch `chore/cleanup` in `main` mergen & pushen | **P1** | **S** | `.git`, `CHANGELOG.md` | `git log --oneline` zeigt 2 Commits vor `origin/main` | Fertig wenn: `git log origin/main --oneline` zeigt `46c46ba` und `a304368`
- [x] **M02** | `jwtConfusionEngine.js` Mock-RSA-Key pre-commit-kompatibel reformatieren & kapseln | **P1** | **S** | `src/utils/jwtConfusionEngine.js`, `.gitleaks.toml` | `jwtConfusionEngine.js:77` – `SAMPLE_RSA_PRIVATE_KEY` löst Pre-Commit-Hook aus | Fertig wenn: `git add src/utils/jwtConfusionEngine.js` → Pre-Commit-Hook ≠ Exit 1; `npm run lint:ci` 0 Fehler
- [x] **M03** | `isolate: false` & `testTimeout: 15000` in Vitest aktivieren | **P2** | **S** | `vite.config.js` | Vitest-Ausgabe: „could be at least ~64 s faster with isolate:false" | Fertig wenn: `npm run test:fast` < 100 s (erreicht: 64 s); 0 Test-Fehler durch fehlende Isolation

### Phase 2 – Kurzfristig (Test-Coverage)

- [x] **M04** | Unit-Tests für `audioSystem.js` ergänzen | **P2** | **M** | `src/utils/audioSystem.js` → `src/utils/audioSystem.test.js` | Kein Test für `audioSystem.js` (einer von 5 Utils ohne Test) | Fertig wenn: ≥ 5 Vitest-Tests für `soundManager` (setVolume, setMuted, play/stop-Fallback); Coverage-Line dieser Datei ≥ 70 % (erreicht: 6 Tests, 100 % Lines)
- [x] **M05** | Unit-Tests für `sandboxEvaluator.js` ergänzen | **P2** | **M** | `src/utils/sandboxEvaluator.js` → `src/utils/sandboxEvaluator.test.js` | Nur E2E-Abdeckung (`e2e/sandbox-and-settings.spec.js`); keine Unit-Tests | Fertig wenn: ≥ 5 Unit-Tests (BLOCKED_GLOBALS, Timeout, Code-Ausführung); Coverage-Line ≥ 60 % (erreicht: 9 Tests)
- [x] **M06** | Unit-Tests für `errorMonitoring.js` ergänzen | **P2** | **M** | `src/utils/errorMonitoring.js` → `src/utils/errorMonitoring.test.js` | Kein Test; Side-Effect-Modul (`window.onerror`, `console.error` Override) | Fertig wenn: ≥ 3 Tests (Handler-Registration, Capture-Logic); Coverage-Line ≥ 60 % (erreicht: 3 Tests)
- [x] **M07** | Coverage-Schwellwerte nach Testergänzungen anheben | **P3** | **S** | `vite.config.js:113-125` | Schwellwerte Statements 60, Branches 52 — knapp über Ist-Werten | Fertig wenn: Schwellwerte auf Statements 62, Branches 53.5, Functions 47, Lines 63.5 erhöht; `npm run test:coverage` grün (erreicht: 62.82 / 54.53 / 47.72 / 64.41 %)

### Phase 3 – Mittelfristig (Architektur & DX)

- [x] **M08** | `Navbar.jsx` aufteilen (901 Zeilen → modulare Teilkomponenten) | **P3** | **L** | `src/components/Navigation/Navbar.jsx` | `Navbar.jsx` hatte 901 Zeilen | Fertig wenn: Aufgeteilt in `NavDesktopMenu.jsx`, `NavDropdownMenu.jsx`, `NavToolsMenu.jsx`, `NavProfileMenu.jsx`, `NavMobileDrawer.jsx` & `navbarMenuItems.js`; Haupt-Navbar von 901 auf 263 Zeilen verschlankt; Smoke- & Routing-Tests grün

- [x] **M09** | GitHub Actions auf SHA-gepinnte Versionen umstellen | **P2** | **S** | `.github/workflows/ci.yml` | `ci.yml` nutzte major pinning | Fertig wenn: Alle `uses:` Einträge enthalten 40-Zeichen-SHA; Dependabot-Config für Actions vorhanden (erledigt: checkout@11bd719, setup-node@49933ea, cache@0057852, upload-artifact@ea165f8, size-limit-action@94bc357)

- [ ] **M10** | `labModulesData.js` in Topic-Chunks aufteilen | **P3** | **L** | `src/data/labModulesData.js` (2 432 Zeilen) | Monolithische Datendatei; wird komplett geladen, auch wenn nur 1 Lab gerendert wird | Fertig wenn: ≥ 5 Topic-Chunk-Dateien; dynamischer Import via `labRegistry.js`; Bundle-Size `npm run size` ≤ Budget

- [ ] **M11** | `sandboxTestUtils.js` dokumentieren oder in `sandboxRunner.js` integrieren | **P3** | **S** | `src/utils/sandboxTestUtils.js` | Kein Unit-Test; Nutzung ausschließlich in Lab-Tests — unklar ob Teil der öffentlichen API | Fertig wenn: JSDoc-Kommentar erklärt Rolle; oder in `sandboxRunner.js` verschoben; kein Test-Fehler

- [ ] **M12** | `og:image`-Script in README dokumentieren | **P3** | **S** | `README.md`, `scripts/generate-og-image.js` | Script existiert, npm-Script `og:image` ist in `package.json` eingetragen, aber kein Hinweis in README | Fertig wenn: README enthält Abschnitt `npm run og:image` mit Beschreibung

### Phase 4 – Langfristig (Lab-Coverage)

- [ ] **M13** | Exemplarische Unit-Tests für komplexe Labs ergänzen (5 Pilot-Labs) | **P3** | **L** | `src/components/Content/{SubnettingLab,BinaryConverterLab,OsiModelLab,SqlInjectionLab,AlgorithmVisualizerLab}.jsx` + je `.test.jsx` | ~229 Labs nur über Smoke-Test; keine Interaktions-Tests | Fertig wenn: 5 Pilot-Labs haben je ≥ 3 Interaktionstests (User-Input → State-Change → XP-Vergabe); `allLabsA11y.test.jsx` weiterhin grün

- [ ] **M14** | A11y axe-core-Schwellwert in Lighthouse CI auf 0.95 anheben | **P3** | **S** | `lighthouserc.json` | `lighthouserc.json` setzt A11y-Threshold < 0,9; Vitest axe-Tests laufen alle Labs durch | Fertig wenn: `lighthouserc.json` `minScore: 0.95`; `npm run e2e` grün

---

## 3. Vorgehen je Phase

```
Phase 1 (M01–M03) → build + lint + test → Commit `chore: phase-1`
Phase 2 (M04–M07) → build + lint + test:coverage → Commit `test: phase-2`
Phase 3 (M08–M12) → build + lint + test + size-check → Commit `refactor: phase-3`
Phase 4 (M13–M14) → build + lint + test + e2e → Commit `test: phase-4`
```

**Rollback-Strategie**: Jede Phase ist 1 atomarer Commit. Bei Regressions-Fehler: `git revert <commit>` ohne `--no-verify`.

**Teststrategie nach jeder Phase**:
1. `npm.cmd run lint:ci` → 0 Fehler
2. `npm.cmd run typecheck` → 0 Fehler
3. `npm.cmd run test:fast` → alle Tests bestanden
4. `npm.cmd run build` → ✅ keine Fehler
5. _(Phase 2+)_ `npm.cmd run test:coverage` → Schwellwerte erfüllt
6. _(Phase 3+)_ `npm.cmd run size` → Bundle-Budgets eingehalten

---

## 4. Risiken & offene Fragen

| # | Risiko / Frage | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|---|
| R1 | `isolate: false` bricht Test-Isolation (globale Mocks) | Mittel | Hoch | Vor Aktivierung alle Tests mit `--reporter=verbose` screenen; bei Fehler nicht aktivieren |
| R2 | `labModulesData.js`-Split bricht dynamische Lab-Suche (Command Palette) | Mittel | Hoch | Import-Mapping sichern; Command-Palette-E2E-Test vor/nach |
| R3 | SHA-Pinning GH Actions: Dependabot-PRs erhöhen Wartungsaufwand | Niedrig | Niedrig | Dependabot nur für Actions-Gruppe konfigurieren |
| R4 | `Navbar.jsx`-Refactor bricht Keyboard-Navigation / A11y | Mittel | Mittel | `allLabsA11y.test.jsx` + manueller Tastatur-Test nach Refactor |
| R5 | Coverage-Threshold-Erhöhung (M07) schlägt wegen ungetesteter Labs fehl | Hoch | Niedrig | Erst nach M04–M06 ausführen; Threshold konservativ erhöhen |
| R6 | `jwtConfusionEngine.js` (M02): Regex-Reformatierung bricht Lab-Funktionalität | Niedrig | Mittel | Unit-Tests für `jwtConfusionEngine.test.js` vor + nach laufen lassen |

---

## Optional (kein Beleg im Code, rein konzeptionell)

- Service Worker Offline-Fallback-Seite mit Lernmaterial statt Browser-Default
- IndexedDB-Migration-Strategie (aktuell kein Versioning dokumentiert)
- Storybook für UI-Komponenten (keine Konfiguration vorhanden)
- Internationalisation (i18n) – aktuell nur Deutsch hardcoded
- GitHub Codespaces / Dev Container Konfiguration für schnelleres Onboarding

---

*Letzte Aktualisierung: 2026-10-28 — Autor: Antigravity AI*
