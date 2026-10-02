---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.72.0
date: 2026-10-02
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.72.0)
1. **Web Worker Code-Sandbox (`src/utils/sandboxRunner.js`, `sandbox.worker.js`)**:
   - Sichere Code-Ausführung mit 3-Sekunden-Timeout gegen Endlosschleifen via `worker.terminate()`.
   - Vollständige Abschottung von DOM, LocalStorage, IndexedDB, Fetch und WebSockets.
2. **404-Not-Found-Ansicht & Routen-Toleranz (`src/components/NotFoundView.jsx`)**:
   - Benutzerfreundliche 404-Seite mit Schnellsuche und Rückkehr zum Dashboard; Trailing-Slash-Unterstützung.
3. **Persistente Anzeige-Einstellungen (`src/utils/uiPreferences.js`)**:
   - Speicherung von Theme, Font-Size und A11y-Modi (Dyslexie, Kontrast, Reduced Motion).
4. **PWA-Bereinigung & Service-Worker-Optimierung**:
   - Bereinigung veralteter Manifest-/SW-Dateien, Single-Point-Registrierung und Behebung des falschen Erstbesuch-Update-Toasts.
5. **RFC 793 TCP Connection State Machine & 3-Way Handshake Studio (`TcpStateMachineLab.jsx` & `src/utils/tcpStateMachineEngine.js`)**:
   - Vollständiger Zustandsautomat für Client & Server: `CLOSED`, `LISTEN`, `SYN_SENT`, `SYN_RECEIVED`, `ESTABLISHED`, `FIN_WAIT_1`, `FIN_WAIT_2`, `TIME_WAIT` (2MSL), `CLOSE_WAIT` und `LAST_ACK`.
6. **Prometheus Alertmanager & PromQL Alert Rule Evaluator Studio (`SreSloBurnLab.jsx` & `src/utils/sreSloBurnEngine.js`)**:
   - Didaktische Simulation der Prometheus Alert State Machine (`INACTIVE` &rarr; `PENDING` &rarr; `FIRING`).

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.72.0)
- **Unit- & Integrationstests**: 1609 bestandene Tests in 176 Test-Dateien (100% Erfolgsquote)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 641 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (269 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 76.55 KB gzipped < 105 KB Limit); Lighthouse: Perf 98 / A11y 98 / BP 100 / SEO 100
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, automatische Labels + axe-core-Test über alle Labs)
