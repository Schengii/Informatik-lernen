# CLAUDE.md - Informatik-lernen (IT-DevGame)

Entwickler- und KI-Leitfaden für das Projekt **Informatik-lernen (IT-DevGame)** – Die interaktive Lernplattform und Prüfungsvorbereitung für Fachinformatiker (FIAE, FISI, IT-SE) nach IHK-Standard.

---

## 🛠️ Tech-Stack & Kerntechnologien

- **Frontend-Framework**: React 19 (Hooks, Context, Zustand Store, React.lazy Code-Splitting)
- **Bundler & Build**: Vite 7 mit Rolldown-Engine & `@vite-pwa` Service Worker
- **Styling**: Vanilla CSS Design-System mit CSS-Variablen (`src/styles/global.css`), Glassmorphism, Dark Mode & WCAG 2.1 A11y (Reduced Motion)
- **Icons**: `lucide-react`
- **State Management**: Zustand (`src/store/useStore.js`) mit LocalStorage Persistenz & XP/Level/Streak Gamification
- **Testing**: Vitest 4 mit `@testing-library/react` und jsdom
- **Linting**: Oxlint (`oxlint src`) für ultraschnelle statische Codeanalyse

---

## 🚀 Häufige Entwickler-Befehle

```bash
# Entwicklungsserver starten (Standard-Port http://localhost:5173)
npm run dev

# Vollständige Test-Suite ausführen (102 Test-Dateien, 520 Tests)
npm test

# Test-Coverage-Report erzeugen (Statements/Branches/Functions/Lines)
npm run test:coverage

# Bundle-Size-Regression gegen definierte Chunk-Limits prüfen (nach npm run build)
npm run size

# End-to-End Smoke-Tests gegen den Produktions-Build (Playwright)
npm run e2e

# Einzelnen Test ausführen
npx vitest run src/utils/nwaEngine.test.js

# Linter ausführen (Oxlint)
npm run lint

# Produktions-Build erstellen & PWA Chunks generieren
npm run build

# Produktions-Build lokal vorab testen
npm run preview
```

---

## 📐 Architektur- & Design-Prinzipien

1. **Prüfungs- & Praxisrelevanz (IHK)**:
   - Alle Algorithmen, kaufmännischen Formeln und Netzwerk-Berechnungen (z. B. NWA, RAID, VLSM, Deckungsbeitrag, Optimaler Bestellmenge) müssen nach offiziellen IHK-Prüfungsrichtlinien validiert sein.
2. **Entkopplung von Engine & UI**:
   - Reine Berechnungs- und Simulationslogik gehört nach `src/utils/*Engine.js` und wird mit isolierten Unit-Tests (`src/utils/*Engine.test.js`) abgesichert.
   - UI-Komponenten in `src/components/Content/*.jsx` konsumieren die Engines und binden XP-Rewards ein.
3. **Performance & Code-Splitting**:
   - Alle großen Laboratorien und Simulatoren müssen in `src/App.jsx` per `React.lazy()` dynamisch importiert werden.
4. **Barrierefreiheit (Accessibility & A11y)**:
   - Respektiere Nutzer-Präferenzen für reduzierte Bewegung (`prefers-reduced-motion` und `body.reduced-motion`).
   - Keine Viewport-Zoom-Blocker (`user-scalable=no` verboten).
5. **README-Wartungsregel (`AGENTS.md`)**:
   - Wann immer Dateien hinzugefügt, verändert oder entfernt werden, muss `README.md` aktualisiert und die Änderungshistorie fortgeführt werden.
6. **Fehlerisolation (Error Boundaries)**:
   - Der gesamte Tab-Content-Bereich in `App.jsx` sowie jedes Modal in `ModalContainer.jsx` sind bereits mit `src/components/ErrorBoundary.jsx` umschlossen. Neue Labs benötigen dafür KEINE eigene Boundary — ein Absturz in einem Lab zeigt automatisch eine lokale Fallback-UI statt die gesamte App zum Absturz zu bringen.
7. **Smoke-Test-Abdeckung für neue Labs**:
   - `src/components/allLabsSmoke.test.jsx` rendert automatisch JEDE Datei in `src/components/Content/*.jsx` (via `import.meta.glob`) mit generischen No-Op-Props. Ein neues Lab wird also ohne weiteres Zutun mitgetestet — nur bei echten Sonderfällen (z. B. Komponenten, die zwingend echtes Netzwerk/WebAssembly/Web-Worker beim Mount brauchen) muss es explizit in `KNOWN_UNSUITABLE_FOR_JSDOM_SMOKE` eingetragen und dort begründet werden.
8. **Graduelle Typisierung sicherheitskritischer Engines**:
   - `checkJs` ist projektweit deaktiviert (`tsconfig.json`), sodass bestehender Code nicht plötzlich hunderte Typfehler wirft. Eine Datei wird gezielt typgeprüft, indem `// @ts-check` als erste Zeile ergänzt und die Funktionen mit JSDoc (`@param`/`@returns`/`@typedef`) versehen werden — siehe `src/utils/ihkGradeCalculations.js`, `src/utils/nwaEngine.js` und `src/utils/storage.js` als Referenzmuster. `npm run typecheck` (`tsc --noEmit`) prüft nur die so markierten Dateien und läuft in CI. Neue oder geänderte Engines mit realem Fehlerrisiko (Noten-/Geld-/Sicherheitsberechnungen) sollten nach diesem Muster typisiert werden.
