# Umsetzungsplan (PLAN.md) – Informatik-lernen (IT-DevGame)

Stand der Analyse: 2026-10-22, Version 3.77.0, Branch `main`. Dieser Plan ersetzt den vorherigen (alle M01–M25 waren erledigt; Verlauf in der Git-Historie). Einzige Arbeitsgrundlage für Umsetzung und Tests.

**Umsetzungsstand (2026-10-22, Branch `feat/plan-umsetzung`, Version 3.78.0):** erledigt M01–M11, M14–M18; teilweise M13 (Rest in N01–N03); verworfen M12 (Messung); blockiert/zurückgestellt M19, M20 (Begründung jeweils in der Zeile). Verifikation: `lint:ci`, `typecheck`, `npm audit` (prod), Build, `size`, 1946 Unit-Tests, 38 E2E-Tests grün. Legende: `[x]` erledigt, `[~]` teilweise/verworfen, `[!]` blockiert/zurückgestellt.

## 1. Ist-Zustand (max. 10 Zeilen, Stand der Analyse vor der Umsetzung)
1. Stack: React 19, Vite 8 (Rolldown), Zustand, Vitest 5, Playwright, Oxlint. 238 Dateien in `src/components/Content/`, 153 `*Engine.js`, alle Engines mit `// @ts-check`.
2. Gemessen: `lint:ci` 0 Warnungen, `typecheck` fehlerfrei, `build` 4,5 s, `size` alle 6 Limits eingehalten, `npm test` 212 Dateien / 1909 Tests grün (136 s). E2E nicht ausgeführt.
3. Coverage (gemessen): Statements 62,46 / Branches 54,35 / Functions 47,68 / Lines 64,04 % – knapp über den Schwellen (60/52/45/62).
4. Bundle-Reserve: Haupt-Bundle 87,9 von 105 KB, PDF 175 von 190 KB (92 %), SQL 107 von 120 KB, Charts 114 von 130 KB.
5. Produktions-CSP (`vercel.json:66-67`) wird von keinem Test angewandt: Playwright prüft `npm run preview` (`playwright.config.js:27`) ohne Vercel-Header. Mehrere Features kollidieren vermutlich mit der CSP (M01–M04).
6. A11y: Nur 3 von 11 Modals haben `role="dialog"`; keines hat Focus-Trap oder Fokus-Rückgabe.
7. PWA: Manifest enthält nur ein SVG-Icon (`vite.config.js:48-54`), keine PNG 192/512.
8. CI: Tests laufen doppelt (`ci.yml:31` und `:34`), Lighthouse-Job baut erneut (`ci.yml:92-94`); Oxlint nutzt nur 2 explizite Regeln (`.oxlintrc.json`).
9. Doku: Drei parallele Regelwerke (`CLAUDE.md`, `GEMINI.md`, `.agents/AGENTS.md`); `CLAUDE.md:31` verweist auf eine Testzahl in der README, die dort nicht steht.
10. `npm audit` meldet 20 Funde (15 high), alle über die optionale Abhängigkeit `react-native-fs` von `alasql` (`package-lock.json:5441`); direkte Abhängigkeiten ohne Fund.

---

## 2. Maßnahmen

### Phase 1: Produktionsverhalten absichern (CSP) – zuerst, weil M02–M04 darauf aufbauen
- [x] M01 | E2E gegen Preview mit den Headern aus `vercel.json` laufen lassen | P1 | M | `playwright.config.js`, `e2e/sandbox-and-settings.spec.js`, `vercel.json` | playwright.config.js:27, vercel.json:66-67 | Fertig wenn: Playwright den Preview-Server mit der CSP aus `vercel.json` ausliefert (z. B. Header-Route oder Preview-Proxy) und ein Test CSP-Verstöße (`securitypolicyviolation`) als Fehler wertet.
- [x] M02 | Sandbox-Worker gegen CSP prüfen und beheben (`new Function` ohne `'unsafe-eval'`) | P1 | M | `src/utils/sandboxEvaluator.js`, `src/utils/sandboxRunner.js`, `vercel.json` | src/utils/sandboxEvaluator.js:83, src/utils/sandboxEvaluator.js:91, vercel.json:67 | Fertig wenn: Sandbox-E2E (`sandbox-and-settings.spec.js`) unter M01-CSP grün ist; entweder per eng begrenztem CSP-Eintrag nur für die Worker-Datei oder ein anderes Ausführungsverfahren, ohne `'unsafe-eval'` für die Hauptseite. (Hypothese aus Code + CSP-Text, vor Umsetzung im Browser bestätigen.)
- [x] M03 | YouTube-Einbettung gegen CSP prüfen (`frame-src` fehlt) | P1 | S | `vercel.json` | vercel.json:67, src/data/videosData.js:9, src/components/Content/VideoHub.jsx:37 | Fertig wenn: CSP enthält `frame-src https://www.youtube-nocookie.com` (kein `default-src`-Fallback) und ein E2E-Test zeigt, dass der Player-iframe ohne CSP-Verstoß lädt.
- [x] M04 | Monaco-Loader gegen CSP prüfen (Standard-Loader lädt von CDN) | P1 | M | `src/components/Content/MonacoStudioLab.jsx`, `vercel.json`, `vite.config.js` | src/components/Content/MonacoStudioLab.jsx:2, src/components/Content/MonacoStudioLab.jsx:68, vercel.json:67 | Fertig wenn: Editor unter M01-CSP lädt und die `size`-Limits halten; Variante (lokal bündeln vs. CDN-Host in CSP) ist begründet. (Hypothese: `@monaco-editor/react` nutzt standardmäßig jsDelivr – vor Umsetzung im Browser bestätigen.)

### Phase 2: Lieferkette
- [x] M05 | `npm audit` einordnen und in CI aufnehmen | P2 | S | `.github/workflows/ci.yml`, `package.json` | package-lock.json:5441, .github/workflows/ci.yml:31 | Fertig wenn: belegt ist, dass `react-native-fs` nicht im Build landet (`dist/` enthält es nicht); CI führt `npm audit --omit=dev --omit=optional --audit-level=high` aus und ist grün, Rest ist in Abschnitt 4 dokumentiert.
- [x] M06 | `'unsafe-inline'` für Skripte in der CSP entfernen | P3 | M | `index.html`, `vercel.json` | index.html:83, vercel.json:67 | Fertig wenn: Das Inline-Skript in `index.html:83` ausgelagert oder per Hash erlaubt ist und `script-src` kein `'unsafe-inline'` mehr enthält; E2E aus M01 bleibt grün. Nach M02–M04.

### Phase 3: Barrierefreiheit (WCAG 2.1 AA)
- [x] M07 | Gemeinsamen Dialog-Baustein (Escape, Focus-Trap, Fokus-Rückgabe, `role`/`aria-modal`/`aria-labelledby`) anlegen | P2 | M | `src/components/Shared/` (neu), Test daneben | src/components/Gamification/BadgesModal.jsx:9 (Escape-Logik dort lokal dupliziert), src/components/Footer/DsgvoFooterModal.jsx:12, src/components/Gamification/FlashcardsModal.jsx:18 | Fertig wenn: Baustein mit Unit-Test (Tab-Zyklus, Escape, Fokus-Rückgabe) existiert.
- [x] M08 | Die 8 Modals ohne Dialog-Semantik und ohne Escape umstellen | P2 | M | `src/components/Gamification/BackupModal.jsx`, `CertificateModal.jsx`, `src/components/Navigation/AudioSettingsModal.jsx`, `CommandPaletteModal.jsx`, `src/components/Content/GlossaryModal.jsx`, `VocabularyTrainerModal.jsx`, `DeploymentGuideModal.jsx`, `src/components/Onboarding/RoleSelectionModal.jsx` | `grep -c "role=.dialog"` = 0 und Escape-Treffer = 0 in allen acht (CommandPalette: 1 Escape) | Fertig wenn: alle acht den Baustein aus M07 nutzen, per Tastatur schließbar sind (außer ggf. RoleSelection beim Erststart, dort begründen) und `allLabsA11y.test.jsx` grün bleibt.
- [x] M09 | Die 3 bestehenden Dialoge auf den Baustein umstellen | P2 | S | `BadgesModal.jsx`, `FlashcardsModal.jsx`, `DsgvoFooterModal.jsx` | src/components/Gamification/BadgesModal.jsx:38, src/components/Gamification/FlashcardsModal.jsx:117, src/components/Footer/DsgvoFooterModal.jsx:236 (haben `role="dialog"`, aber kein `focus`) | Fertig wenn: lokale Escape-Handler entfallen und Fokus beim Öffnen/Schließen korrekt gesetzt wird (Unit-Test).

### Phase 4: PWA
- [x] M10 | PNG-Icons (192/512, maskable) ins Manifest und als Benachrichtigungs-Icon | P2 | S | `vite.config.js`, `public/`, `src/utils/pushNotificationManager.js`, `scripts/` | vite.config.js:48-54, src/utils/pushNotificationManager.js:38, :39, :57 | Fertig wenn: Manifest enthält PNG 192×192 und 512×512 (inkl. maskable), `pushNotificationManager.js` verweist darauf und Lighthouse-CI (`lighthouserc.json`) bleibt grün.

### Phase 5: Tests, CI, Developer Experience
- [x] M11 | Doppelten Testlauf in CI entfernen | P2 | S | `.github/workflows/ci.yml` | .github/workflows/ci.yml:30-34 | Fertig wenn: nur `npm run test:coverage` läuft (führt alle Tests aus: 1909 grün im Coverage-Lauf bestätigt) und die CI-Laufzeit sinkt messbar.
- [~] M12 | Vitest-Isolation prüfen (`isolate: false`) | P2 | S | `vite.config.js` | vite.config.js:92 (`test`-Block), Vitest-Hinweis im Lauf: „~31 s schneller mit isolate: false" | Fertig wenn: `npm test` unter 105 s und weiterhin 1909/1909 grün, sonst Maßnahme verwerfen und Grund hier notieren (Risiko: Zustand zwischen Dateien, siehe Abschnitt 4). **Verworfen (gemessen 2026-10-22):** mit `isolate: false` 125 s (215 Dateien, 1946 Tests grün) gegenüber 136 s im Ausgangslauf – Ziel < 105 s verfehlt, Zeit steckt in den A11y-/Routing-Tests (Tests 69 %), nicht im Worker-Start. Einstellung bleibt unverändert.
- [~] M13 | Oxlint um `jsx-a11y` erweitern | P2 | S | `.oxlintrc.json`, betroffene Komponenten | .oxlintrc.json:4-9 (nur `react` und `oxc`) | Fertig wenn: Plugin aktiv, `npm run lint:ci` 0 Warnungen; Befunde behoben statt Regeln abgeschaltet. Nach M07–M09, damit die Dialog-Befunde nicht doppelt bearbeitet werden. **Teilweise erledigt (2026-10-22):** Plugin `jsx-a11y` ist aktiv, `lint:ci` meldet 0 Warnungen; die 18 Befunde der übrigen Regeln sind behoben. Vier Massenregeln sind vorläufig ausgeschaltet (464 Befunde insgesamt, siehe N01–N03), weil sie hunderte Stellen in über 100 Labs betreffen und nicht mehr „S“ sind.
- [x] M14 | Coverage-Schwellen nachziehen | P3 | S | `vite.config.js` | vite.config.js:113-117 (60/52/45/62) vs. gemessen 62,46/54,35/47,68/64,04 | Fertig wenn: Schwellen auf Ist-Stand minus ca. 1 Punkt stehen und `test:coverage` grün bleibt. Nach M08–M09 (neue Tests).
- [x] M15 | Lighthouse-Job ohne zweiten Build | P3 | S | `.github/workflows/ci.yml` | .github/workflows/ci.yml:92-94 | Fertig wenn: `dist/` als Artefakt aus dem Test-Job wiederverwendet wird und der Job grün ist.
- [x] M16 | Lokale Abhängigkeitsabweichung klären | P3 | S | `package.json`, `package-lock.json` | `npm ls`: alasql@4.19.1 „invalid: ^4.20.0" (lokales `node_modules`), Lockfile: package-lock.json:5426 = 4.20.0 | Fertig wenn: nach `npm ci` meldet `npm ls` keine „invalid"-Einträge. Reine Umgebungsfrage, kein Repo-Defekt; CI nutzt `npm ci`. **Erledigt:** durch `npm install` (M04) ist `alasql` 4.20.0 installiert, `npm ls` meldet keine invalid/missing/extraneous-Einträge.

### Phase 6: Architektur und Doku
- [x] M17 | `CLAUDE.md`/README-Widerspruch zur Testzahl beheben | P3 | S | `CLAUDE.md`, `README.md`, `CHANGELOG.md` | CLAUDE.md:31 („steht in README.md"), README.md ohne Testzahl, CHANGELOG.md:12 nennt noch 1.223 Tests (Ist: 1909) | Fertig wenn: Verweis oder Zahl stimmt (Empfehlung: Verweis auf `npm test` statt feste Zahl).
- [x] M18 | `GEMINI.md` und `.agents/AGENTS.md` auf Verweise auf `CLAUDE.md` reduzieren | P3 | S | `GEMINI.md`, `.agents/AGENTS.md` | GEMINI.md:1-40 und .agents/AGENTS.md:1-12 duplizieren Regeln aus CLAUDE.md | Fertig wenn: Befehle und Prinzipien nur noch an einer Stelle gepflegt werden. Vorher klären (Abschnitt 4), ob andere Werkzeuge Verweise auflösen.
- [!] M19 | Doppelte Lab-Registrierung (`labRegistry.js` + `labModulesData.js`) zusammenführen | P3 | L | `src/data/labRegistry.js`, `src/data/labModulesData.js`, `scripts/new-lab.js`, `scripts/gen-lab-list.js` | src/data/labRegistry.js (1091 Zeilen), src/data/labModulesData.js (2432 Zeilen), CLAUDE.md „Checkliste" Punkt 3 und 4 | Fertig wenn: ein Lab nur noch an einer Stelle ergänzt wird, `labModulesData.test.js`, `App.routing.test.jsx` und `npm run docs:labs` unverändert grün sind und `size` hält (Chunk `labModulesData` ist 70 KB). **Blockiert (2026-10-22):** Die Zusammenführung würde die Lab-Metadaten (Icons, Beschreibungen, Tags; Chunk `labModulesData` = 22,7 KB gzip) in den App-Shell-Chunk ziehen, der Haupt-Bundle liegt bei 87,9 KB gegenüber dem Limit von 105 KB (87,9 + 22,7 = 110,6 KB) – `size` würde reißen. Eine Zusammenführung bei erhaltener Lazy-Ladung bräuchte ein Build-Skript, das die Registry aus den Metadaten erzeugt; das ist eine eigene Designentscheidung (siehe Abschnitt 4, Frage 5). Konsistenz sichert bis dahin `labModulesData.test.js` (Eintrag ohne Route schlägt fehl).
- [!] M20 | Die größten Lab-Komponenten aufteilen | P3 | M | `StpProtocolLab.jsx` (779 Zeilen), `WisoKalkulationLab.jsx` (775), `BackupStrategyLab.jsx` (739), `WisoSachmaengelLab.jsx` (682), `BpmnProcessLab.jsx` (651) | `wc -l src/components/Content/*.jsx` | Fertig wenn: jede unter ca. 500 Zeilen, Smoke- und A11y-Tests unverändert grün. Nur bei Anlass (Änderung am Lab), kein Selbstzweck. **Zurückgestellt (2026-10-22):** Jedes der fünf Labs besteht aus einem einzigen ca. 550–650 Zeilen langen JSX-`return` mit vielen gemeinsamen State-Variablen; unter 500 Zeilen kommt man nur durch Aufteilen in Tab-Unterkomponenten mit umfangreichen Props. Das ist ein Verhaltensrisiko ohne Funktionsgewinn, die Labs haben nur Smoke-/A11y-Tests. Der Plan selbst nannte die Maßnahme „nur bei Anlass“; sie bleibt für den nächsten fachlichen Eingriff an einem dieser Labs offen.

### Neu gefunden (bei der Umsetzung, 2026-10-22)
- [ ] N01 | Labels per `htmlFor`/`id` oder Umschließen mit Eingabefeldern verknüpfen und Regel `jsx-a11y/label-has-associated-control` wieder einschalten | P2 | L | `.oxlintrc.json` und ca. 100 Lab-Komponenten (Beispiele: `SubnettingLab.jsx:128`, `JwtAttackLab.jsx:129`, `SystemDesignLab.jsx:134`) | `npx oxlint --jsx-a11y-plugin src`: 291 Befunde | Fertig wenn: Regel in `.oxlintrc.json` nicht mehr auf `off` steht und `npm run lint:ci` 0 Warnungen meldet. Das Laufzeit-Fallback `a11yAutoLabel.js` deckt Screenreader teilweise ab, ersetzt aber keine echten Labels.
- [ ] N02 | Klickbare `div`s (Karten, Backdrops) per Tastatur bedienbar machen (`button` bzw. `role`+`onKeyDown`) und `click-events-have-key-events` / `no-static-element-interactions` einschalten | P2 | L | `.oxlintrc.json`, u. a. `ItsmSimulatorLab.jsx:73`, `PostgresExplainVisualizerLab.jsx:28` | `npx oxlint --jsx-a11y-plugin src`: 72 + 63 Befunde (Backdrops der Modals sind durch Escape/Close-Button abgedeckt und können mit `oxlint-disable` + Begründung ausgenommen werden) | Fertig wenn: beide Regeln aktiv und `lint:ci` sauber.
- [ ] N03 | `prefer-tag-over-role` bewerten (natives `<dialog>`, `<output>`, `<fieldset>`) | P3 | M | `CertificateModal.jsx:117`, `MistakeReviewWidget.jsx:53`, `MistakeReviewWidget.jsx:78` | 20 Befunde | Fertig wenn: entweder umgestellt oder Regel bewusst mit Begründung ausgeschaltet bleibt.

### Optional (Ideen ohne Beleg im Projektcode)
- [ ] O01 | CSP mit Nonces statt Hashes/Inline | P3 | L | `index.html`, `vercel.json` | – | Fertig wenn: Strikte CSP ohne `'unsafe-inline'` für Skripte und Styles.
- [ ] O02 | Veralteten Header `X-XSS-Protection` entfernen | P3 | S | `vercel.json` | – | Fertig wenn: Header entfernt, Security-Header-Test (falls vorhanden) grün.

---

## 3. Vorgehen je Phase

Allgemein: Pro Maßnahme ein Commit, Reihenfolge wie aufgeführt. Vor Phasenstart `git status` sauber; Basis-Check ist `npm run lint:ci && npm run typecheck && npm test`. Rollback je Phase: `git revert` der Phasen-Commits (nichts per `reset --hard`).

### Phase 1: CSP
- **Reihenfolge**: M01 → M02 → M03 → M04 (M01 liefert das Prüfwerkzeug; M02–M04 erst im Browser bestätigen, dann beheben).
- **Test**: `npm run build && npm run e2e`, `npm run size`.
- **Rollback**: `git revert` der Commits zu `vercel.json`, `playwright.config.js`, `MonacoStudioLab.jsx`, `sandbox*`. Nach CSP-Änderungen Vercel-Preview-Deployment manuell prüfen (Sandbox, Video, Monaco), bevor `main` live geht.

### Phase 2: Lieferkette
- **Reihenfolge**: M05 → M06.
- **Test**: `npm run build`, `npm run e2e`.
- **Rollback**: `git revert`; `package-lock.json` nicht von Hand ändern.

### Phase 3: A11y
- **Reihenfolge**: M07 → M09 (wenig Risiko) → M08.
- **Test**: `npx vitest run src/components/allLabsA11y.test.jsx`, neue Dialog-Tests, `npm run e2e` (`accessibility.spec.js`).
- **Rollback**: `git revert` je Modal-Commit.

### Phase 4: PWA
- **Reihenfolge**: M10.
- **Test**: `npm run build`, `npm run e2e` (`pwa-offline.spec.js`), Lighthouse-CI.
- **Rollback**: `git revert`; Service-Worker-Cache kann alte Manifeste halten → Version hochzählen/Hard-Reload.

### Phase 5: Tests, CI, DX
- **Reihenfolge**: M11 → M12 → M13 → M14 → M15 → M16.
- **Test**: Volle CI-Kette lokal: `npm run lint:ci && npm run typecheck && npm run test:coverage && npm run build && npm run size && npm run e2e`.
- **Rollback**: `git revert`; Workflow-Änderungen zuerst auf einem Branch per PR prüfen.

### Phase 6: Architektur und Doku
- **Reihenfolge**: M17 → M18 → M19 → M20.
- **Test**: Volle CI-Kette wie Phase 5; für M19 zusätzlich `npm run docs:labs` und Diff von `docs/LABS.md` (muss leer sein).
- **Rollback**: `git revert`; M19 in einem eigenen Branch.

---

## 4. Risiken und offene Fragen

### Risiken
1. **M02–M04 sind Hypothesen.** Sie folgen aus CSP-Text und Code, nicht aus einem Lauf gegen das Deployment. Ein Fehlalarm ist möglich (z. B. wenn Vercel/Browser die Worker-CSP anders anwendet). M01 muss das klären, bevor etwas geändert wird.
2. **CSP lockern vs. Sicherheit.** `'unsafe-eval'` auf der Hauptseite wäre ein Rückschritt für die Sandbox-Garantie (`CLAUDE.md` Prinzip 9). Lösung nur eng begrenzt.
3. **`isolate: false` (M12)** kann versteckte Testabhängigkeiten (globaler Zustand, `localStorage`, Mocks) offenlegen; dann Maßnahme verwerfen.
4. **Bundle-Reserve PDF (92 %)**: neue Abhängigkeiten oder lokales Monaco-Bundling (M04) können `size`-Limits reißen.
5. **Dialog-Umbau (M08)** ändert Fokus- und Tastaturverhalten aller Modals; `RoleSelectionModal` erscheint beim Erststart und darf evtl. nicht per Escape schließbar sein.
6. **Nicht gemessen:** E2E-Suite (`npm run e2e`), Lighthouse und Verhalten in Safari/Firefox wurden in dieser Analyse nicht ausgeführt.

### Offene Fragen
1. Ist `react-native-fs` je im Build gelandet? (M05 prüft `dist/`.) Wenn nein: Audit-Funde per `overrides` oder `--omit=optional` behandeln?
2. Soll `RoleSelectionModal` per Escape schließbar sein? (Umgesetzt: ja, wie der vorhandene Schließen-Button; bei Bedarf `closeOnEscape: false` in `RoleSelectionModal.jsx` setzen.)
3. Sollen `GEMINI.md`/`.agents/AGENTS.md` weiter eigenständig bleiben (andere Werkzeuge lesen keine Verweise)?
4. Wird die Produktionsumgebung wirklich mit der CSP aus `vercel.json` ausgeliefert (Vercel-Projekt ist verknüpft)? Ein Blick ins Deployment (Response-Header) beantwortet das vor M01.
5. Soll die Lab-Registrierung (M19) über ein Build-Skript aus einer Quelle erzeugt werden, oder bleiben zwei Dateien mit Konsistenztest?
6. ~~Header-Regeln in `vercel.json` (Lookahead-Muster) gegen ein echtes Vercel-Preview prüfen~~ **Geprüft (2026-10-22, Preview `dpl_CSByoBdotfsHeTccJLFYixnypjxK`, Commit f7b34e9):** `/` liefert die globale CSP ohne `'unsafe-eval'` und ohne `'unsafe-inline'` für Skripte; `/assets/sandbox.worker-BfCCm63Q.js` liefert die Worker-CSP (`default-src 'none'; script-src 'self' 'unsafe-eval'; connect-src 'none'`) plus die übrigen Sicherheits-Header und `Cache-Control: immutable`. Die Header kommen also nicht doppelt an.
