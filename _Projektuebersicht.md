---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.72.0
date: 2026-10-03
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CHANGELOG|📝 Versions- & Änderungshistorie (CHANGELOG.md)]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden für Claude (CLAUDE.md)]]
- [[GEMINI|🤖 Entwickler- & KI-Leitfaden für Gemini & Antigravity (GEMINI.md)]]
- `.gitignore`, `.gitattributes` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.72.0)
1. **RFC 2131 DHCP DORA & Relay-Agent Studio (`DhcpDoraLab.jsx` & `src/utils/dhcpDoraEngine.js`)**:
   - Vollständiger DORA-Zustandsautomat: `INIT`, `SELECTING`, `REQUESTING`, `BOUND`, `RENEWING`, `REBINDING`.
   - Interaktiver 4-Way Handshake (Discover -> Offer -> Request -> Ack), Lease-Timeline (T1 50% Renewal per Unicast, T2 87.5% Rebind per Broadcast) und Relay Agent Weiterleitung über Subnetzgrenzen mit `GIADDR` (+55 XP).
2. **IHK Software-Testverfahren & Grenzwertanalyse Studio (`TestverfahrenLab.jsx` & `src/utils/testverfahrenEngine.js`)**:
   - Black-Box-Äquivalenzklassenbildung (GÄK & UÄKs) mit Live-Eingabetester für Prüfungs-Szenarien.
   - 6-Punkte Grenzwertanalyse ($min-1, min, min+1, max-1, max, max+1$).
   - McCabe Zyklomatische Komplexität ($M = E - N + 2P$) mit Risikoklassifizierung und Kontrollfluss-Überdeckungsmetriken (C0, C1, C2) (+55 XP).
3. **IHK WISO Angebotsvergleich & Skontorechner Studio (`WisoAngebotsvergleichLab.jsx` & `src/utils/wisoAngebotsvergleichEngine.js`)**:
   - Quantitativer Angebotsvergleich mit vollständigem Kalkulationsschema (LEP -> Rabatt -> ZEP -> Skonto -> BEP -> Bezugskosten -> Bezugspreis / Einstandspreis).
   - Skonto vs. Kontokorrentkredit: Exakte Berechnung des effektiven Lieferantenzinses ($p_{\text{eff}} = \frac{\text{Skontosatz} \times 360}{\text{Zahlungsziel} - \text{Skontofrist}}$), Gegenüberstellung mit Bankkreditzins und IHK-Entscheidungsbegründung.
   - Qualitativer Angebotsvergleich mit Scoring-Nutzwertmatrix (+55 XP).
4. **Web Worker Code-Sandbox (`src/utils/sandboxRunner.js`, `sandbox.worker.js`)**:
   - Sichere Code-Ausführung mit 3-Sekunden-Timeout gegen Endlosschleifen via `worker.terminate()`.
   - Vollständige Abschottung von DOM, LocalStorage, IndexedDB, Fetch und WebSockets.
5. **404-Not-Found-Ansicht & Routen-Toleranz (`src/components/NotFoundView.jsx`)**:
   - Benutzerfreundliche 404-Seite mit Schnellsuche und Rückkehr zum Dashboard; Trailing-Slash-Unterstützung.
6. **Persistente Anzeige-Einstellungen (`src/utils/uiPreferences.js`) & Multi-Tab-Synchronisation**:
   - Speicherung von Theme, Font-Size und A11y-Modi (Dyslexie, Kontrast, Reduced Motion) und Multi-Tab State-Sync via BroadcastChannel (`it_devgame_sync`).
7. **PWA-Bereinigung & Service-Worker-Optimierung**:
   - Bereinigung veralteter Manifest-/SW-Dateien, Single-Point-Registrierung und Behebung des falschen Erstbesuch-Update-Toasts.
8. **KI-, Tooling- & Entwickler-Infrastruktur (Claude, Gemini & GitHub)**:
   - `CHANGELOG.md` nach Keep a Changelog Standard, `GEMINI.md` als Leitfaden für Google Antigravity & Gemini.
   - `.gitattributes` für LF-Normalisierung, GitHub PR-/Issue-Templates (`.github/`), Dependabot und `.vscode/`.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.72.0)
- **Unit- & Integrationstests**: 1634 bestandene Tests in 179 Test-Dateien (100% Erfolgsquote), 25 E2E-Tests
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 644 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (271 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 76.55 KB gzipped < 105 KB Limit); Lighthouse: Perf 98 / A11y 98 / BP 100 / SEO 100
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, automatische Labels + axe-core-Test über alle Labs)
