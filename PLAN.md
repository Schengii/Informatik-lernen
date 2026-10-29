# PLAN.md – Informatik-lernen (IT-DevGame)

> **Einzige Arbeitsgrundlage** für Umsetzung und Tests.  
> Stand: 2026-10-29 · Branch `main` · Version 3.78.0

---

## 1. Ist-Zustand

- **Stack**: React 19, Vite 8 (Rolldown), Zustand 5 + localStorage + BroadcastChannel, Vanilla CSS Design-System / TailwindCSS 4, Oxlint 1.88, Vitest 5, Playwright 1.64, PWA (Workbox)
- **Umfang**: 252 Content-Labs (`src/components/Content/*.jsx`), 177 Utils-Engines, 180 Unit-Test-Dateien, 28 Komponenten-Tests
- **Build**: `npm run build` ✅ ~13 s; `npm run lint:ci` 0 Fehler/Warnungen; `npm run typecheck` 0 Fehler
- **Tests**: `npm run test:fast` → alle Tests bestanden; isolierte Tests für Audio, Sandbox, Monitoring & Modals ergänzt
- **Coverage**: Statements 61,9 % · Branches 53,6 % · Functions 47,1 % · Lines 63,5 % – über Schwellwerten (60/52/45/62)
- **CI/CD**: GitHub Actions – `npm audit (high) → lint:ci → typecheck → test:coverage → build → size → e2e + Lighthouse`; Actions aktuell major-gepinnt
- **Sicherheit**: Pre-Commit-Hook ✅; `.gitleaks.toml` ✅; `jwtConfusionEngine.js` Mock-RSA-Key formatiert & allowlisted; Worker-CSP separiert
- **A11y**: Alle Modals nutzen `useDialogA11y` (Focus-Trap, Escape, Fokus-Rückgabe); Oxlint `jsx-a11y` aktiv
- **Technische Schulden**: `Navbar.jsx` 901 Zeilen; `labModulesData.js` 2 432 Zeilen; N01–N03 offene Oxlint jsx-a11y Regeln

---

## 2. Maßnahmen

### Phase 1 – Hygiene & Unblocking
- [x] **M01** | Branch `chore/cleanup` in `main` mergen & pushen | **P1** | **S** | `.git`, `CHANGELOG.md`
- [x] **M02** | `jwtConfusionEngine.js` Mock-RSA-Key pre-commit-kompatibel reformatieren & kapseln | **P1** | **S** | `src/utils/jwtConfusionEngine.js`, `.gitleaks.toml`
- [x] **M03** | `isolate: false` & `testTimeout: 15000` in Vitest aktivieren | **P2** | **S** | `vite.config.js`

### Phase 2 – Test-Coverage & Härtung
- [x] **M04** | Unit-Tests für `audioSystem.js` ergänzen | **P2** | **M** | `src/utils/audioSystem.js` → `src/utils/audioSystem.test.js` (6 Tests, 100 % Lines)
- [x] **M05** | Unit-Tests für `sandboxEvaluator.js` ergänzen | **P2** | **M** | `src/utils/sandboxEvaluator.js` → `src/utils/sandboxEvaluator.test.js` (9 Tests)
- [x] **M06** | Unit-Tests für `errorMonitoring.js` ergänzen | **P2** | **M** | `src/utils/errorMonitoring.js` → `src/utils/errorMonitoring.test.js` (3 Tests)
- [ ] **M07** | Coverage-Schwellwerte nach Testergänzungen anheben | **P3** | **S** | `vite.config.js:113-125` | Schwellwerte auf Statements 64, Branches 55, Functions 50, Lines 65 erhöhen; `npm run test:coverage` grün

### Phase 3 – Architektur & DX
- [ ] **M08** | `Navbar.jsx` aufteilen (901 Zeilen → ≤ 3 Teilkomponenten) | **P3** | **L** | `src/components/Navigation/Navbar.jsx` | `Navbar.jsx` < 200 Zeilen; `NavCommandPalette.jsx`, `NavSettingsPanel.jsx` extrahieren
- [ ] **M09** | GitHub Actions auf SHA-gepinnte Versionen umstellen | **P2** | **S** | `.github/workflows/ci.yml` | Alle `uses:` Einträge enthalten 40-Zeichen-SHA; Dependabot-Config für Actions vorhanden
- [ ] **M10** | `labModulesData.js` in Topic-Chunks aufteilen | **P3** | **L** | `src/data/labModulesData.js` (2 432 Zeilen) | Topic-Chunk-Dateien; dynamischer Import via `labRegistry.js`; Bundle-Size `npm run size` ≤ Budget
- [ ] **M11** | `sandboxTestUtils.js` dokumentieren oder in `sandboxRunner.js` integrieren | **P3** | **S** | `src/utils/sandboxTestUtils.js` | JSDoc-Kommentar oder Zusammenführung
- [ ] **M12** | `og:image`-Script in README dokumentieren | **P3** | **S** | `README.md`, `scripts/generate-og-image.js`

### Phase 4 – Lab-Coverage & Lighthouse
- [ ] **M13** | Exemplarische Unit-Tests für komplexe Labs ergänzen (5 Pilot-Labs) | **P3** | **L** | `src/components/Content/{SubnettingLab,BinaryConverterLab,OsiModelLab,SqlInjectionLab,AlgorithmVisualizerLab}.jsx` + je `.test.jsx`
- [ ] **M14** | A11y axe-core-Schwellwert in Lighthouse CI auf 0.95 anheben | **P3** | **S** | `lighthouserc.json` | `lighthouserc.json` `minScore: 0.95`; `npm run e2e` grün

### Nachbereitung QA-Befunde (A11y, Layout & CSP)
- [ ] **N01** | Labels per `htmlFor`/`id` oder Umschließen mit Eingabefeldern verknüpfen und Regel `jsx-a11y/label-has-associated-control` wieder einschalten | **P2** | **L** | `.oxlintrc.json` und betroffene Lab-Komponenten (291 Befunde)
- [ ] **N02** | Klickbare `div`s (Karten, Backdrops) per Tastatur bedienbar machen (`button` bzw. `role`+`onKeyDown`) und `click-events-have-key-events` / `no-static-element-interactions` einschalten | **P2** | **L** | `.oxlintrc.json`
- [ ] **N03** | `prefer-tag-over-role` bewerten (natives `<dialog>`, `<output>`, `<fieldset>`) | **P3** | **M** | `CertificateModal.jsx`, `MistakeReviewWidget.jsx`
- [ ] **N04** | Verbleibende Überläufe bei 320 px in Labs einzeln beheben (verschachtelte Flex-Container ohne Umbruch, feste Breiten) | **P2** | **L** | Betroffene Labs prüfen
- [ ] **N05** | Alasql-basierte SQL-Labs unter der Produktions-CSP absichern (`new Function` inalasql): Engine im Sandbox-Worker ausführen oder CSP-konform kapseln | **P1** | **L** | `src/utils/sqlSandboxEngine.js`, `/sql_joins`, `/sqlite_studio`, `/sqlite_worker_lab`
- [ ] **N06** | Farbkontrast (WCAG 1.4.3) und Schriftgrößen in Labs auditieren | **P2** | **L** | axe `color-contrast` auf allen Routen

### Optionale Maßnahmen
- [ ] **O01** | CSP mit Nonces statt Hashes/Inline prüfen | **P3** | **L** | `index.html`, `vercel.json`
- [ ] **O02** | Veralteten Header `X-XSS-Protection` entfernen | **P3** | **S** | `vercel.json`
- [ ] **O03** | Service Worker Offline-Fallback-Seite mit Lernmaterial statt Browser-Default
- [ ] **O04** | IndexedDB-Migration-Strategie (aktuell kein Versioning dokumentiert)

---

## 3. Vorgehen je Phase

```
Phase 1 (M01–M03) → build + lint + test → Commit `chore: phase-1`
Phase 2 (M04–M07) → build + lint + test:coverage → Commit `test: phase-2`
Phase 3 (M08–M12) → build + lint + test + size-check → Commit `refactor: phase-3`
Phase 4 (M13–M14) → build + lint + test + e2e → Commit `test: phase-4`
QA-Befunde (N01–N06) → isolierte Commits je Regel/Feature
```

**Rollback-Strategie**: Jede Phase ist atomar. Bei Regressions-Fehler: `git revert <commit>` ohne `--no-verify`.

**Teststrategie nach jeder Phase**:
1. `npm run lint:ci` → 0 Fehler
2. `npm run typecheck` → 0 Fehler
3. `npm run test:fast` → alle Tests bestanden
4. `npm run build` → ✅ keine Fehler
5. `npm run test:coverage` → Schwellwerte erfüllt
6. `npm run size` → Bundle-Budgets eingehalten

---

## 4. Risiken & offene Fragen

| # | Risiko / Frage | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|---|
| R1 | `isolate: false` bricht Test-Isolation (globale Mocks) | Mittel | Hoch | Tests mit `--reporter=verbose` überwachen; Mocks in `afterEach` säubern |
| R2 | `labModulesData.js`-Split bricht dynamische Lab-Suche (Command Palette) | Mittel | Hoch | Import-Mapping sichern; Command-Palette-E2E-Test vor/nach |
| R3 | SHA-Pinning GH Actions: Dependabot-PRs erhöhen Wartungsaufwand | Niedrig | Niedrig | Dependabot nur für Actions-Gruppe konfigurieren |
| R4 | `Navbar.jsx`-Refactor bricht Keyboard-Navigation / A11y | Mittel | Mittel | `allLabsA11y.test.jsx` + manueller Tastatur-Test nach Refactor |
| R5 | Coverage-Threshold-Erhöhung (M07) schlägt wegen ungetesteter Labs fehl | Hoch | Niedrig | Erst nach M04–M06 ausführen; Threshold konservativ erhöhen |
| R6 | `jwtConfusionEngine.js` (M02): Regex-Reformatierung bricht Lab-Funktionalität | Niedrig | Mittel | Unit-Tests für `jwtConfusionEngine.test.js` vor + nach laufen lassen |
| R7 | Alasql unter CSP (N05): Worker-Kapselung notwendig | Mittel | Hoch | Reine Web-Worker-Ausführung nutzen analog zu `sandboxRunner.js` |

---

*Letzte Aktualisierung: 2026-10-29*
