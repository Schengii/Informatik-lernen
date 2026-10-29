# Umsetzungsplan (PLAN.md) – Informatik-lernen (IT-DevGame)

Stand der Analyse: 2026-10-29, Version 3.78.0, Branch `feat/plan-umsetzung` (= `origin/feat/plan-umsetzung` + Merge von `main`, Commit 706f4a8). Ersetzt beide Vorgänger-Pläne (QA-Plan M01–M20/N01–N06 von `main` und M01–M14 vom Branch; Verlauf in der Git-Historie). **Einzige Arbeitsgrundlage für Umsetzung und Tests.** Legende: `[x]` erledigt, `[~]` teilweise, `[!]` blockiert (Grund in der Zeile).

## 1. Ist-Zustand (gemessen am 2026-10-29)
1. Stack: React 19, Vite 8, Zustand 5, Vitest 5, Playwright 1.64, Oxlint 1.88. 238 Labs in `src/components/Content/`, 153 `*Engine.js`.
2. `lint:ci` 0 Warnungen, `typecheck` fehlerfrei, `npm audit` (prod) 0 Funde, `build` 5,9 s, `size` alle 6 Limits eingehalten (Haupt-Bundle 88,8/105 KB, PDF 175/190 KB).
3. Unit-Tests: 228 Dateien, 1991 Tests grün, 113 s. Coverage (vor Merge): 63,3 / 55,1 / 48,2 / 64,9 %, Schwellen 62 / 53,5 / 47 / 63,5 %.
4. E2E: 36 von 37 grün; `pwa-offline.spec.js:10` fällt nur im Parallel-Lauf aus (allein 2/2 grün).
5. **Funktionsfehler**: Die alasql-Labs laufen unter der Produktions-CSP nicht (`/sql_joins` wirft `EvalError`, `/sqlite_studio` und `/sqlite_worker_lab` melden `script-src eval`). Im Browser bestätigt.
6. CI: Nach dem Merge sind die Actions gemischt: SHA-gepinnte v4-Versionen (Branch) neben ungepinnten `@v7`/`@v8` (main).
7. PWA: Der Precache ist 6,1 MB groß (387 Einträge), laut Kommentar sollen es ca. 1–1,5 MB sein. Den größten Teil macht der Monaco-JSON-Chunk mit 1,2 MB aus.
8. A11y: Vier `jsx-a11y`-Regeln sind aus, mit 291 + 64 + 63 + 20 Befunden. Lighthouse-A11y-Schwelle 0,95, der Wert wurde lokal noch nie gemessen.
9. Doku: Die Testlaufzeit „~64 s“ in README/CHANGELOG ist nicht belegt (gemessen 113–137 s). `CLAUDE.md` beschreibt die Lab-Daten und `GEMINI.md` nicht mehr richtig.
10. Bereits erledigt und nicht erneut geplant: CSP-Tests, Dialog-A11y, PWA-Icons, Navbar-Split, Aufteilung von `labModulesData`, Pilot-Lab-Tests, `sandboxTestUtils`-Doku, `og:image`-Doku.

---

## 2. Maßnahmen

### Phase 1: Funktion unter Produktions-CSP
- [x] P01 | SQL-Labs (alasql) CSP-konform machen: alasql in einem eigenen Worker mit Worker-CSP ausführen (Muster: Sandbox-Worker), Hauptseite bleibt ohne `'unsafe-eval'` | P1 | L | `src/utils/sqlSandboxEngine.js`, `src/components/Content/SqlJoinVisualizerLab.jsx`, `src/components/Games/SqlDungeon.jsx`, `src/utils/sqliteWorkerBridge.js`, `vercel.json`, `e2e/csp.spec.js` | src/utils/sqlSandboxEngine.js:2, src/components/Content/SqlJoinVisualizerLab.jsx:2, src/components/Games/SqlDungeon.jsx:4, vercel.json:67 (kein `'unsafe-eval'`); Browser-Lauf: `EvalError … at _.Insert.compile (vendor-sql-*.js)` | Fertig wenn: neue Fälle in `e2e/csp.spec.js` für `/sql_joins`, `/sqlite_studio`, `/sqlite_worker_lab` und das SQL-Dungeon-Spiel führen eine Abfrage aus, zeigen ein Ergebnis und melden 0 CSP-Verstöße; `script-src` der Hauptseite enthält kein `'unsafe-eval'`; `size` hält. **Erledigt (2026-10-29):** `sql.worker.js` + `sqlWorkerCore.js` + `sqlWorkerClient.js` (ohne Worker in Node/jsdom direkt im Prozess); `SqlSandboxInstance`, `SqliteWorkerBridge`, `SqliteWasmStudioLab`, `SqlJoinVisualizerLab`, `SqlDungeon` asynchron; Worker-CSP-Regel in `vercel.json` gilt für `sandbox|sql`; Worker ist vom Precache ausgenommen. Geprüft: 5 neue E2E-Fälle grün (2 volle Läufe), 1996 Unit-Tests grün, `size` unverändert (Haupt-Bundle 88,8 KB).

### Phase 2: CI, PWA, Testinfrastruktur
- [x] P02 | GitHub Actions vereinheitlichen: jede Action auf ihre aktuelle Major-Version, als 40-Zeichen-SHA mit Versionskommentar (auch `gitleaks.yml`) | P1 | S | `.github/workflows/ci.yml`, `.github/workflows/gitleaks.yml` | .github/workflows/ci.yml:13 (checkout v4.2.2-SHA, in main war `@v7`), ci.yml:53 (`upload-artifact@v7` ungepinnt), ci.yml:103 (`download-artifact@v8` ungepinnt, lädt Artefakt aus `upload-artifact` v4.6.2 von ci.yml:40), gitleaks.yml:13 (`checkout@v4`) | Fertig wenn: `grep "uses:" .github/workflows/*.yml` zeigt nur SHA-Referenzen, je Action eine einheitliche Version, keine Rückstufung gegenüber `main`; die SHAs sind per `gh api repos/<action>/git/ref/tags/<tag>` überprüft. **Erledigt (2026-10-29):** checkout v7.0.1, setup-node v7.1.0, upload-artifact v7.0.2, download-artifact v8.0.2, cache v6.1.0, size-limit-action v1.8.0, gitleaks-action v3.0.0 (v2 lief auf Node 20, seit 16.09.2026 nicht mehr auf GitHub-Runnern); SHAs per `gh api …/git/ref/tags/<tag>` aufgelöst, YAML per PyYAML geprüft. Die echte Prüfung ist der CI-Lauf des PR.
- [ ] P03 | Precache auf das zurückführen, was der Kommentar zusagt: Monaco-Sprach-/Editor-Chunks aus dem Precache nehmen und per Runtime-Cache laden | P2 | S | `vite.config.js` | vite.config.js:47-49 (Kommentar: „~1–1,5 MB“), Build: `precache 387 entries (6083.84 KiB)`, größter Eintrag `assets/jsonMode-*.js` 1207 KiB | Fertig wenn: der Build meldet einen Precache unter 3 MB, `e2e/pwa-offline.spec.js` grün, Monaco-Lab lädt online (`e2e/csp.spec.js` Monaco-Fall grün).
- [ ] P04 | PWA-E2E im Parallel-Lauf stabil machen | P2 | S | `e2e/pwa-offline.spec.js` | e2e/pwa-offline.spec.js:10 (✘ im Gesamtlauf nach 31,1 s, allein 2/2 grün) | Fertig wenn: `npm run e2e` dreimal hintereinander ohne Fehler. Nach P03, weil der kleinere Precache die Ursache (Service-Worker-Installation unter Last) bereits entschärfen kann.
- [ ] P05 | `isolate: false` auf dem aktuellen Stand messen und entscheiden | P2 | S | `vite.config.js` | vite.config.js:120; frühere Messung (Plan von main, M12): 125 s mit vs. 136 s ohne, Ziel verfehlt; README.md:161 behauptet ~64 s | Fertig wenn: `npx vitest run` mit beiden Einstellungen gemessen ist, die schnellere Variante bleibt (bei < 10 % Unterschied: `isolate: true`, weniger Risiko für Zustandslecks), Ergebnis hier notiert.
- [ ] P06 | Lighthouse-A11y-Schwelle 0,95 lokal belegen | P2 | S | `lighthouserc.json` | lighthouserc.json:11 (`minScore: 0.95`, Anhebung ohne dokumentierte Messung) | Fertig wenn: `npx @lhci/cli autorun` gegen `dist/` erreicht ≥ 0,95 A11y (dann bleibt die Schwelle), sonst Schwelle auf den gemessenen Wert abgerundet und Grund notiert.
- [ ] P07 | Coverage-Schwellen auf den neuen Ist-Stand nachziehen | P3 | S | `vite.config.js` | vite.config.js:144-147 (62/53,5/47/63,5) vs. gemessen 63,3/55,1/48,2/64,9 | Fertig wenn: Schwellen ca. 1 Punkt unter dem Ist-Stand nach P01, Kommentar mit Datum aktualisiert, `npm run test:coverage` grün.

### Phase 3: Sicherheits-Header
- [ ] P08 | Veralteten Header `X-XSS-Protection: 1; mode=block` entfernen (Browser ignorieren ihn, der XSS-Auditor ist entfernt; die CSP übernimmt den Schutz) | P3 | S | `vercel.json`, `e2e/csp.spec.js` | vercel.json:50, vercel.json:83 | Fertig wenn: Header in beiden Regeln entfernt, ein E2E-Fall prüft, dass `/` und der Sandbox-Worker die übrigen Sicherheits-Header weiter liefern.

### Phase 4: Barrierefreiheit (Oxlint-Regeln wieder einschalten)
- [ ] P09 | Labels mit Eingabefeldern verknüpfen, `jsx-a11y/label-has-associated-control` einschalten (vormals N01) | P2 | L | `.oxlintrc.json`, betroffene Labs | .oxlintrc.json:10; 291 Befunde, z. B. src/components/Content/Raid6GaloisLab.jsx:165, src/components/Content/OauthTokenExchangeLab.jsx:95 | Fertig wenn: Regel nicht mehr `off`, `npm run lint:ci` 0 Warnungen, `allLabsA11y.test.jsx` grün.
- [ ] P10 | Klickbare `div`s per Tastatur bedienbar machen, `click-events-have-key-events` und `no-static-element-interactions` einschalten (vormals N02) | P2 | L | `.oxlintrc.json`, betroffene Komponenten | .oxlintrc.json:11-12; 64 + 63 Befunde | Fertig wenn: beide Regeln aktiv, `lint:ci` sauber; Modal-Backdrops (Escape/Schließen-Button vorhanden) nur mit `oxlint-disable-next-line` + Begründung.
- [ ] P11 | `prefer-tag-over-role` umsetzen oder begründet abschalten (vormals N03) | P3 | M | `.oxlintrc.json`, u. a. `CertificateModal.jsx`, `MistakeReviewWidget.jsx` | .oxlintrc.json:13; 20 Befunde | Fertig wenn: Regel aktiv mit 0 Befunden, oder bewusst `off` mit Begründung in `CLAUDE.md`.

### Phase 5: Developer Experience und Doku
- [ ] P12 | `npm run new-lab` an die aufgeteilten Lab-Daten anpassen: neuer Eintrag landet in der Themendatei unter `src/data/labModules/` (passend zur Kategorie), nicht als Objekt im Spread-Array | P2 | S | `scripts/new-lab.js`, `CLAUDE.md` | scripts/new-lab.js:39, :126-131 (Einfügemarke `export const LAB_MODULES = [` in src/data/labModulesData.js:7); CLAUDE.md:117 nennt noch `labModulesData.js` als Ort | Fertig wenn: Trockenlauf von `new-lab` in einem Wegwerf-Branch schreibt in die richtige Themendatei, `labModulesData.test.js` grün, Trockenlauf danach verworfen; CLAUDE.md-Checkliste nennt `src/data/labModules/*.js`.
- [ ] P13 | Doku-Fehlangaben korrigieren: Testlaufzeit „~64 s“ (nach P05), Versionsüberschriften in der README, `GEMINI.md`-Beschreibung und N-Verweise in `CLAUDE.md` | P3 | S | `README.md`, `CHANGELOG.md`, `CLAUDE.md` | README.md:161, README.md:175, CHANGELOG.md:44 (64 s; gemessen 113–137 s); README.md:148 („Aktuelle Version v3.78.0“ über unveröffentlichten Änderungen); CLAUDE.md:135 („weitgehend dieselben Projektregeln“, GEMINI.md hat 5, AGENTS.md 3 Zeilen); CLAUDE.md:91 (verweist auf N01–N03) | Fertig wenn: keine der genannten Stellen widerspricht dem gemessenen Stand oder diesem Plan.

### Neu gefunden (bei der Umsetzung)
- [ ] N01 | Header-Regeln in `vercel.json` (`(?:sandbox|sql)` im Lookahead, `(sandbox|sql)` in der Worker-Regel) auf einem Vercel-Preview prüfen | P2 | S | `vercel.json` | vercel.json:39, :72 – lokal prüft `vite preview` die Muster als RegExp, Vercel nutzt path-to-regexp | Fertig wenn: Preview-Deployment liefert für `/assets/sql.worker-*.js` die Worker-CSP und für `/` die globale CSP (Response-Header, wie am 2026-10-22 für den Sandbox-Worker).
- [ ] N02 | PR-Job „size-limit trend“ ersetzen: `andresz1/size-limit-action` ist auch in der neuesten Version (v1.8.0) eine Node-20-Action und läuft auf GitHub-Runnern nicht mehr | P2 | S | `.github/workflows/ci.yml` | ci.yml:139; `action.yml` der Version: `using: 'node20'`; gitleaks-action-Release v3.0.0: Node 20 seit 16.09.2026 entfernt | Fertig wenn: Der PR-Job läuft grün (eigener Schritt mit `npx size-limit --json` und `gh pr comment`, oder Job entfernt, weil der harte `size`-Schritt im test-Job bleibt).

### Optional (ohne Beleg im versionierten Projekt)
- [ ] O01 | Überläufe bei 320 px in Labs einzeln beheben (vormals N04). Beleg nur in lokalen, git-ignorierten Messdaten (`tmp/qa/`), z. B. `/itsm_simulator` +440 px.
- [ ] O02 | Farbkontrast WCAG 1.4.3 in Labs mit fest gesetzten Hex-Farben (vormals N06). Beleg nur aus dem lokalen axe-Crawl (`tmp/qa/contrast.mjs`); jsdom-axe prüft `color-contrast` nicht.
- [ ] O03 | CSP mit Nonces/Hashes auch für Styles (`style-src 'unsafe-inline'`, vercel.json:67). Erfordert Abkehr von Inline-Styles in über 200 Labs.
- [ ] O04 | Größte Labs (`StpProtocolLab.jsx` 779 Zeilen u. a.) aufteilen. Nur bei fachlichem Anlass (siehe Begründung zu M20 im Vorgänger-Plan).
- [ ] O05 | Lab-Registrierung (`labRegistry.js` + `labModules/`) aus einer Quelle erzeugen (Build-Skript), damit ein Lab nur einmal eingetragen wird.

---

## 3. Vorgehen je Phase

Allgemein: Eine Maßnahme ergibt einen Commit, die Nachricht beginnt mit der ID (`P01: …`). Die Reihenfolge ist wie aufgeführt. Vor jeder Maßnahme ist `git status` sauber. Basis-Check nach jeder Maßnahme: `npm run lint:ci && npm run typecheck && npm test`. Bei einem Fehler: Ursache analysieren und beheben, höchstens 3 Versuche, danach `[!]` mit Grund und weiter. Rollback immer per `git revert <commit>`, nie `reset --hard` auf geteilten Branches.

### Phase 1 (P01)
- **Reihenfolge**: zuerst die E2E-Fälle schreiben und rot sehen, dann Worker und Engine-Umbau, dann die Labs.
- **Test**: Basis-Check, `npm run build && npm run size && npm run e2e`, dazu manuell: in `/sql_joins` eine Abfrage ausführen.
- **Rollback**: `git revert` des P01-Commits. Die SQL-Labs sind dann wieder im heutigen (kaputten) Zustand, alle anderen Labs sind nicht betroffen.

### Phase 2 (P02–P07)
- **Reihenfolge**: P02 → P03 → P04 → P05 → P06 → P07 (P07 zuletzt, weil P01 neue Tests bringt).
- **Test**: Basis-Check, nach P03/P04 `npm run build && npm run e2e` (dreimal für P04), nach P07 `npm run test:coverage`. P02 lässt sich lokal nur syntaktisch prüfen, die echte Prüfung ist der CI-Lauf des Pull Requests.
- **Rollback**: `git revert` je Commit. Ein alter Service-Worker-Cache verschwindet nach dem Revert erst mit der nächsten Version oder einem Hard-Reload.

### Phase 3 (P08)
- **Test**: `npm run build && npx playwright test e2e/csp.spec.js`.
- **Rollback**: `git revert`.

### Phase 4 (P09–P11)
- **Reihenfolge**: P09 → P10 → P11, je Regel ein Commit.
- **Test**: Basis-Check, `npx vitest run src/components/allLabsA11y.test.jsx src/components/allLabsSmoke.test.jsx src/components/modalsA11y.test.jsx`, `npm run e2e` (`accessibility.spec.js`).
- **Rollback**: `git revert`. Alternativ die Regel wieder auf `off` setzen, dann bleiben die bereits korrigierten Stellen erhalten.

### Phase 5 (P12–P13)
- **Test**: Für P12 einen Trockenlauf von `npm run new-lab` auf einem Wegwerf-Branch, danach `npm test` und den Wegwerf-Branch löschen. Für P13 Sichtprüfung der Stellen.
- **Rollback**: `git revert`.

---

## 4. Risiken und offene Fragen

### Risiken
1. **P01 ändert den Ablauf von synchron auf asynchron.** Die SQL-Labs rufen `alasql()` heute synchron auf. Ein Worker antwortet asynchron, also müssen Aufrufer und Tests umgebaut werden. Die Unit-Tests laufen ohne Worker und brauchen deshalb einen Inline-Ersatz (Muster: `sandboxTestUtils.js`).
2. **P01, CSP:** Eine eigene Worker-CSP mit `'unsafe-eval'` darf nur für die Worker-Datei gelten (Lookahead-Muster wie beim Sandbox-Worker). `'unsafe-eval'` auf der Hauptseite ist ausgeschlossen (CLAUDE.md, Prinzip 9).
3. **P02:** SHAs werden nur über `gh api` aufgelöst und nie geraten. Ein Major-Wechsel, etwa `upload-artifact` von v4 auf v7, kann das Verhalten ändern. Deshalb ist der CI-Lauf im PR die eigentliche Prüfung.
4. **P03:** Fehlen Monaco-Chunks im Precache, ist das Monaco-Lab offline nicht nutzbar, bis es einmal online geladen wurde. Diesen Kompromiss trifft das Projekt bereits für `editor.api`.
5. **P09–P10** betreffen über 100 Dateien und damit viele Stellen, an denen sich das Verhalten ändern kann. Abgesichert ist das nur durch Smoke-, axe- und E2E-Tests, Interaktionstests gibt es nur für wenige Labs.
6. **Nicht gemessen:** Safari und Firefox sowie Lighthouse in CI (der Wert ist erst nach P06 bekannt).

### Offene Fragen
1. Wird `SqlDungeon` (Spiele-Tab) wie die Labs auf den SQL-Worker umgestellt? Annahme: ja, es nutzt dieselbe Bibliothek und scheitert an derselben CSP.
2. Soll die Lab-Registrierung langfristig aus einer Quelle erzeugt werden (O05)?
3. Sollen O01/O02 mit einem versionierten Messskript (statt `tmp/qa/`) belegt und dann regulär eingeplant werden?
