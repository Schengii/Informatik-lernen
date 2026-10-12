# Umsetzungsplan (PLAN.md) – Informatik-lernen (IT-DevGame)

## 1. Ist-Zustand (max. 10 Zeilen)
- Tech-Stack: React 19, Vite 8 (Rolldown), Zustand Store, Vanilla CSS Design-System (`src/styles/global.css`), Oxlint, Vitest 5, Playwright E2E.
- Codebasis & Tests: 235 Lab-Komponenten, CI-Pipeline (Lint, Typecheck, Test, Coverage, Build, Size-Limit, E2E) läuft lokal und auf GitHub Actions vollständig grün.
- Datenarchitektur: Entkoppelte Calculation-Engines (`src/utils/*Engine.js`), zentrale dynamische `LAB_REGISTRY` mit React.lazy.
- Multi-Tab & Persistenz: Debounced `localStorage` + IndexedDB-Hydration, jedoch fehlerhafte Storage-Key-Mismatch bei Window-Event-Listenern.
- Gamification & SM-2: SRS-Spaced-Repetition speichert Fälligkeitsdaten in `userState.srsFlashcards`, aber Flashcards-Modal ignoriert Fälligkeiten und läuft rein zyklisch.
- Prüfungsrelevanz & Lernplaner: `ihkStudyPlanEngine` und `ihkWeaknessAuditEngine` bieten gute Heuristiken, besitzen aber hardcodierte Datumsdaten (Winter 2026 fix) und inkonsistente Verlinkungen.
- Barrierefreiheit (A11y): Grundlegende WCAG 2.1 AA Konformität und axe-core Tests etabliert, vereinzelt unvollständige CSS-Variablen in neuen Labs.
- Entwickler-Erfahrung: Schneller CI-Durchlauf (~40s Suite), Oxlint-Prüfung ohne Warnungen, PWA-Service-Worker-Erzeugung im Build intakt.

---

## 2. Maßnahmen

### Phase 1: Bugfixes, Datenkonsistenz & Persistenz (Abhängigkeiten zuerst)
- [x] M01 | Multi-Tab Storage-Event Key korrigieren | P1 | S | `src/store/useStore.js` | src/store/useStore.js:255 | Fertig wenn: `e.key === 'informatik_game_state_v1'` geprüft wird und Multi-Tab-Aktualisierung im Storage-Event zuverlässig triggert.
- [x] M02 | BroadcastChannel Event-Dispatch bei Zustandsaktualisierung | P1 | S | `src/utils/storage.js` | src/utils/storage.js:174 | Fertig wenn: `persistStateNow` eine `SYNC_STATE`-Nachricht via BroadcastChannel versendet und offene Nachbartabs ohne Page-Reload synchronisiert werden.
- [x] M03 | UserState Typdefinition & Sanitize-Validierung um `examTargetDate` und `examTargetType` erweitern | P1 | S | `src/utils/storage.js` | src/utils/storage.js:22, src/utils/storage.js:271 | Fertig wenn: `FIELD_VALIDATORS` und `initialProfileState` beide Felder validieren und Backup-Importe die Prüfungstermine nicht verwerfen.
- [x] M04 | Duplizierte Tags in Lab-Moduldefinitionen bereinigen | P1 | S | `src/data/labModulesData.js` | src/data/labModulesData.js:1585, src/data/labModulesData.js:2235, src/data/labModulesData.js:2245 | Fertig wenn: Keine doppelten `#WISO`-Tags in Arrays existieren und die React-Key-Warnung in Tests nicht mehr auftritt.
- [ ] M05 | Echte Badge-Freischaltlogik im Badges-Modal reparieren | P1 | S | `src/components/Gamification/BadgesModal.jsx` | src/components/Gamification/BadgesModal.jsx:67 | Fertig wenn: `isUnlocked` ausschließlich über `userState.unlockedBadges.includes(badge.id)` ermittelt wird und nicht fälschlich alle Badges ab 100 XP freischaltet.

### Phase 2: Prüfungs- & Lernplan-Engines (IHK Kernlogik)
- [ ] M06 | Dynamische Prüfungstermin-Berechnung im IHK Study Plan Engine | P1 | M | `src/utils/ihkStudyPlanEngine.js` | src/utils/ihkStudyPlanEngine.js:11-15 | Fertig wenn: `IHK_EXAM_DATES` dynamisch für das aktuelle und Folgejahr basierend auf Frühjahrs-, Sommer- und Winter-Standardterminen generiert wird.
- [ ] M07 | Zeitzonen-sichere Differenzberechnung in `calculateExamCountdown` | P2 | S | `src/utils/ihkStudyPlanEngine.js` | src/utils/ihkStudyPlanEngine.js:63-66 | Fertig wenn: Datumsschlüssel über UTC-Mitternacht (analog `daysBetweenDateKeys`) verglichen werden und Sommer-/Winterzeit-Wechsel keine Rundungsfehler erzeugen.
- [ ] M08 | Verlinkung der Prüfungssimulation im adaptiven Lernplan auf kanonische Route | P1 | S | `src/utils/ihkStudyPlanEngine.js` | src/utils/ihkStudyPlanEngine.js:95 | Fertig wenn: `recommendedLab` in Mock-Exam-Wochen `'exam'` statt des nicht registrierten `'exam_simulator'` referenziert.
- [ ] M09 | Fehlende Fachrichtungen im IHK Study Plan Engine ergänzen | P2 | M | `src/utils/ihkStudyPlanEngine.js` | src/utils/ihkStudyPlanEngine.js:17-22, src/utils/ihkStudyPlanEngine.js:28-55 | Fertig wenn: Fachinformatiker Digitale Vernetzung (FIDV) und IT-Systemmanagement (ITSM) eigene Tracks in `STUDY_TRACKS` und `IHK_DISCIPLINES` besitzen.
- [ ] M10 | Audit-Empfehlungs-Ziele in `ihkWeaknessAuditEngine` auf existente Registry-Labs korrigieren | P1 | S | `src/utils/ihkWeaknessAuditEngine.js` | src/utils/ihkWeaknessAuditEngine.js:109 | Fertig wenn: LF10/LF11 `clean_arch_lab` mit verifizierten Aliasen verknüpft ist und ein Fallback-Routing bei unbekannten Lernfeldern vorhanden ist.
- [ ] M11 | Unit-Test-Abdeckung für `ihkStudyPlanEngine` Randfälle erweitern | P2 | S | `src/utils/ihkStudyPlanEngine.test.js` | src/utils/ihkStudyPlanEngine.test.js:14-27 | Fertig wenn: Tests für alle Fachrichtungen (fiae, fisi, fidp, itse), abgelaufene Termine und Minimum/Maximum-Wochenbereiche vorliegen.
- [ ] M12 | Unit-Test-Abdeckung für `ihkWeaknessAuditEngine` Randfälle erweitern | P2 | S | `src/utils/ihkWeaknessAuditEngine.test.js` | src/utils/ihkWeaknessAuditEngine.test.js:4-30 | Fertig wenn: Tests für leere Historie, 100% Score, unvollständige Daten und alle Lernfeld-Empfehlungen (LF1–LF12) existieren.

### Phase 3: Komponenten-Entkopplung & Architektur-Standards
- [ ] M13 | IhkStudyPlanLab & IhkWeaknessAuditLab in zentrale Lab-Registry migrieren | P2 | M | `src/data/labRegistry.js`, `src/App.jsx` | src/App.jsx:196-199, src/data/labRegistry.js:1060 | Fertig wenn: Beide Labs über `LAB_REGISTRY` registriert sind, Standard-XP-Props konsumieren und redundante Switch-Cases in `App.jsx` entfallen.
- [ ] M14 | Entkopplung der direkten Zustand-Store-Abhängigkeit in `IhkStudyPlanLab` | P2 | S | `src/components/Content/IhkStudyPlanLab.jsx` | src/components/Content/IhkStudyPlanLab.jsx:15, src/components/Content/IhkStudyPlanLab.jsx:45 | Fertig wenn: Die Komponente `onRewardXP` aus den Props nutzt und den Store nicht direkt für XP-Vergaben importiert.
- [ ] M15 | Entkopplung der direkten Zustand-Store-Abhängigkeit in `IhkWeaknessAuditLab` | P2 | S | `src/components/Content/IhkWeaknessAuditLab.jsx` | src/components/Content/IhkWeaknessAuditLab.jsx:14, src/components/Content/IhkWeaknessAuditLab.jsx:45 | Fertig wenn: Die Komponente `onRewardXP` aus den Props nutzt und den Store nicht direkt für XP-Vergaben importiert.
- [ ] M16 | Verknüpfung des echten Fehlerjournals (`userState.mistakeJournal`) mit dem Schwachstellen-Audit | P2 | M | `src/components/Content/IhkWeaknessAuditLab.jsx` | src/components/Content/IhkWeaknessAuditLab.jsx:15-24 | Fertig wenn: Reale falsch beantwortete Prüfungsfragen aus `mistakeJournal` automatisch in das Lernfeld-Audit einfließen statt fixer Mock-Werte.
- [ ] M17 | Persistierung des Lernplan-Fortschritts in UserState | P2 | M | `src/utils/storage.js`, `src/components/Content/IhkStudyPlanLab.jsx` | src/components/Content/IhkStudyPlanLab.jsx:18, src/components/Content/IhkStudyPlanLab.jsx:33 | Fertig wenn: Abgehakte Wochen (`completedWeeks`) im `userState` gespeichert werden und einen Tab-Wechsel überdauern.

### Phase 4: Didaktik & Spaced Repetition (SRS Flashcards)
- [ ] M18 | SM-2 Due-Date-Sortierung im Flashcards-Modal aktivieren | P2 | M | `src/components/Gamification/FlashcardsModal.jsx` | src/components/Gamification/FlashcardsModal.jsx:16-18, src/components/Gamification/FlashcardsModal.jsx:60 | Fertig wenn: Fällige Karten (`dueDate <= today`) priorisiert angezeigt werden und gemeisterte Karten nach Intervall pausieren.
- [ ] M19 | Unvollständiges Anki-Exportformat in FlashcardsModal harmonisieren | P3 | S | `src/components/Gamification/FlashcardsModal.jsx` | src/components/Gamification/FlashcardsModal.jsx:24-34 | Fertig wenn: TSV-Export saubere Kopfzeilen und Zeilenumbrüche ohne Formatierungsbrüche in Anki liefert.

### Phase 5: Barrierefreiheit (WCAG 2.1 AA) & Styling
- [ ] M20 | Dark-Mode Farbanpassung & Design-Tokens in IhkStudyPlanLab | P2 | S | `src/components/Content/IhkStudyPlanLab.jsx` | src/components/Content/IhkStudyPlanLab.jsx:51, src/components/Content/IhkStudyPlanLab.jsx:126, src/components/Content/IhkStudyPlanLab.jsx:217 | Fertig wenn: Alle Hardcoded-Farben (`#1e293b`, `#ffffff`, `#f1f5f9`) durch semantische Variablen (`var(--text-main)`, `var(--bg-card)`, `var(--bg-tertiary)`) ersetzt sind.
- [ ] M21 | Dark-Mode Farbanpassung & Design-Tokens in IhkWeaknessAuditLab | P2 | S | `src/components/Content/IhkWeaknessAuditLab.jsx` | src/components/Content/IhkWeaknessAuditLab.jsx:51, src/components/Content/IhkWeaknessAuditLab.jsx:94, src/components/Content/IhkWeaknessAuditLab.jsx:137 | Fertig wenn: Empfehlungs- und Status-Boxen im Dark-Mode ausreichend Kontrast (mind. 4.5:1) besitzen und `var(--border-color)` nutzen.
- [ ] M22 | Semantische ARIA-Attribute für Wochenplan-Roadmap | P3 | S | `src/components/Content/IhkStudyPlanLab.jsx` | src/components/Content/IhkStudyPlanLab.jsx:177-268 | Fertig wenn: Wochenelemente als Liste (`role="list"` / `role="listitem"`) strukturiert und Checkbox-Zustände mit `aria-checked` versehen sind.

### Phase 6: Testabdeckung, CI & Dokumentation
- [ ] M23 | Isolierte Komponenten-Tests für `IhkStudyPlanLab` hinzufügen | P2 | S | `src/components/Content/IhkStudyPlanLab.test.jsx` | src/components/Content/IhkStudyPlanLab.jsx:14 | Fertig wenn: Test-Suite Rendern, Fachrichtungswechsel, Wochen-Toggle und XP-Claim abdeckt.
- [ ] M24 | Isolierte Komponenten-Tests für `IhkWeaknessAuditLab` hinzufügen | P2 | S | `src/components/Content/IhkWeaknessAuditLab.test.jsx` | src/components/Content/IhkWeaknessAuditLab.jsx:13 | Fertig wenn: Test-Suite Rendern, Schwachstellen-Erkennung, Drill-Empfehlung und Reset abdeckt.
- [ ] M25 | Dokumentation der neuen IHK Prüfungsplaner- und Audit-Module in README.md | P3 | S | `README.md` | README.md:1-150 | Fertig wenn: Modul-Übersicht, Routing-Tabelle und Funktionsweise in README.md vollständig dokumentiert sind.
- [ ] M26 | Historie und Versionsfortschritt in CHANGELOG.md aktualisieren | P3 | S | `CHANGELOG.md` | CHANGELOG.md:1-50 | Fertig wenn: Alle Plan-Ergänzungen und architektonischen Schritte nach dem Keep-a-Changelog Standard gepflegt sind.

---

## 3. Vorgehen je Phase: Reihenfolge, Test nach jeder Phase, Rollback

### Phase 1: Bugfixes, Datenkonsistenz & Persistenz
- **Reihenfolge**: M01 → M02 → M03 → M04 → M05
- **Test nach Phase**:
  - `npm run lint:ci`
  - `npm run typecheck`
  - `npm test -- src/utils/storage.test.js src/utils/storageImport.test.js src/components/Content/LabsDashboard.test.jsx`
- **Rollback**: `git checkout -- src/store/useStore.js src/utils/storage.js src/data/labModulesData.js src/components/Gamification/BadgesModal.jsx`

### Phase 2: Prüfungs- & Lernplan-Engines
- **Reihenfolge**: M06 → M07 → M08 → M09 → M10 → M11 → M12
- **Test nach Phase**:
  - `npm test -- src/utils/ihkStudyPlanEngine.test.js src/utils/ihkWeaknessAuditEngine.test.js`
  - `npm run typecheck`
- **Rollback**: `git checkout -- src/utils/ihkStudyPlanEngine.js src/utils/ihkWeaknessAuditEngine.js src/utils/ihkStudyPlanEngine.test.js src/utils/ihkWeaknessAuditEngine.test.js`

### Phase 3: Komponenten-Entkopplung & Architektur-Standards
- **Reihenfolge**: M13 → M14 → M15 → M16 → M17
- **Test nach Phase**:
  - `npm test -- src/components/allLabsSmoke.test.jsx src/components/allLabsA11y.test.jsx`
  - `npm run build`
- **Rollback**: `git checkout -- src/data/labRegistry.js src/App.jsx src/components/Content/IhkStudyPlanLab.jsx src/components/Content/IhkWeaknessAuditLab.jsx`

### Phase 4: Didaktik & Spaced Repetition (SRS Flashcards)
- **Reihenfolge**: M18 → M19
- **Test nach Phase**:
  - `npm test -- src/utils/sm2Algorithm.test.js src/components/allLabsSmoke.test.jsx`
- **Rollback**: `git checkout -- src/components/Gamification/FlashcardsModal.jsx`

### Phase 5: Barrierefreiheit & Design-Tokens
- **Reihenfolge**: M20 → M21 → M22
- **Test nach Phase**:
  - `npm test -- src/components/allLabsA11y.test.jsx`
  - Manuelle Sichtprüfung im Dark-Mode (`data-theme="dark"`)
- **Rollback**: `git checkout -- src/components/Content/IhkStudyPlanLab.jsx src/components/Content/IhkWeaknessAuditLab.jsx`

### Phase 6: Testabdeckung, CI & Dokumentation
- **Reihenfolge**: M23 → M24 → M25 → M26
- **Test nach Phase**:
  - Vollständige CI-Prüfkette: `npm run lint:ci && npm run typecheck && npm test && npm run test:coverage && npm run build && npm run size`
- **Rollback**: `git checkout -- README.md CHANGELOG.md src/components/Content/IhkStudyPlanLab.test.jsx src/components/Content/IhkWeaknessAuditLab.test.jsx`

---

## 4. Risiken und offene Fragen

### Risiken
1. **IndexedDB & LocalStorage Schemabruch**: Erweiterungen an `initialProfileState` (`examTargetDate`, Lernplan-Wochenfortschritt) müssen über `sanitizeImportedState` und Default-Spread abgesichert werden, um bestehende Spielstände in Browsern der Nutzer nicht zu korrumpieren.
2. **Bundle-Size Budget Limit (105 KB App-Shell)**: Werden Labs nicht via dynamischer `LAB_REGISTRY` sondern statisch importiert, droht das Reißen des 105 KB Budgets (`npm run size`). Daher ist Phase 3 strikt einzuhalten.
3. **React 19 Re-Rendering bei BroadcastChannel Sync**: Beim Empfangen von Sync-Nachrichten darf keine Endlosschleife aus Senden und Empfangen entstehen.

### Offene Fragen
1. **Lernfeld-Zuordnung im Prüfungsfragen-Katalog**: `EXAM_QUESTIONS` in `src/data/examData.js` nutzen aktuell textuelle Kategorien (`Netzwerke & Subnetting`) statt expliziter Lernfeld-Kennungen (`LF1`–`LF12`). Soll ein Mapping-Objekt Kategorie ↔ LF eingeführt werden, um echte Prüfungsergebnisse präzise in das Schwachstellen-Audit einzuspeisen?
2. **Prüfungstermine der IHK-Regionalstellen**: Die Termine für AP1 und AP2 unterscheiden sich bundesweit nur um wenige Tage, jedoch weichen Baden-Württemberg und projektbezogene Abgabetermine ab. Reichen Standard-Prüfungsfenster (Frühjahr, Sommer, Herbst/Winter) mit manueller Überschreibmöglichkeit aus?
