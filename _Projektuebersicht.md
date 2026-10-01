---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.71.0
date: 2026-10-01
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.70.0)
1. **RFC 793 TCP Connection State Machine & 3-Way Handshake Studio (`TcpStateMachineLab.jsx` & `src/utils/tcpStateMachineEngine.js`)**:
   - Vollständiger Zustandsautomat für Client & Server: `CLOSED`, `LISTEN`, `SYN_SENT`, `SYN_RECEIVED`, `ESTABLISHED`, `FIN_WAIT_1`, `FIN_WAIT_2`, `TIME_WAIT` (2MSL), `CLOSE_WAIT` und `LAST_ACK`.
   - Interaktive 1-Klick-Szenarien für 3-Way Handshake (SYN &rarr; SYN-ACK &rarr; ACK) und 4-Way Teardown (FIN &rarr; ACK &rarr; FIN &rarr; ACK mit TIME_WAIT) sowie manuelle Flag-Injektion (SYN, ACK, PSH, FIN, RST).
   - Detaillierter Paketverlauf mit Sequenz- und Acknowledgment-Nummern-Fortschreibung (+55 XP).
2. **Prometheus Alertmanager & PromQL Alert Rule Evaluator Studio (`SreSloBurnLab.jsx` & `src/utils/sreSloBurnEngine.js`)**:
   - Didaktische Simulation der Prometheus Alert State Machine (`INACTIVE` &rarr; `PENDING` &rarr; `FIRING`).
   - Dynamische `for`-Dauer-Prüfung mit Zeitzähler und Templating-Auflösung von `{{ $value }}` und `{{ $labels.service }}` (+45 XP).
3. **IHK WISO BAB II & Zuschlagskalkulation Prüfungs-Drill (`WisoBabLab.jsx` & `src/utils/wisoBabEngine.js`)**:
   - Betriebsabrechnungsbogen II: Gegenüberstellung von Normal-Gemeinkosten und Ist-Gemeinkosten mit Berechnung von Kostenüberdeckung (positiv) und Kostenunterdeckung (negativ) pro Kostenstelle (Material, Fertigung, Verwaltung, Vertrieb).
   - Neuer IHK-Prüfungs-Drill mit Multiple-Choice-Fragen zu Bezugsbasen und Zuschlagssätzen mit +40 XP.
4. **IHK WISO Arbeitsrecht & Kündigungsfristen-Kalenderrechner (`WisoLaborLawLab.jsx` & `src/utils/wisoLaborLawEngine.js`)**:
   - Exakte kalendarische Berechnung des Wirksamkeitsdatums der Kündigung nach BGB § 622 und 3-Wochen-Klagefrist (§ 4 KSchG).
5. **IPv6 Subnetting & Nibble-Boundary Studio (`Ipv6RoutingLab.jsx` & `src/utils/ipv6Routing.js`)**:
   - Subnetz-Planungs-Studio für IPv6: Nibble-Boundaries (4-Bit-Grenzen `/48`, `/52`, `/56`, `/60`, `/64`), SLAAC-Konformität und P2P-Links.
6. **IHK UML 2.5 Klassendiagramm-Prüfungs-Drill (`UmlDiagramLab.jsx` & `src/utils/umlEngine.js`)**: Sichtbarkeiten, Komposition vs. Aggregation und Kardinalitäten.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.71.0)
- **Unit- & Integrationstests**: 1582 bestandene Tests in 174 Test-Dateien (100% Erfolgsquote), 25 E2E-Tests
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 623 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (265 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 75.9 KB gzipped < 105 KB Limit); Lighthouse: Perf 98 / A11y 98 / BP 100 / SEO 100
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, automatische Labels + axe-core-Test über alle Labs)
