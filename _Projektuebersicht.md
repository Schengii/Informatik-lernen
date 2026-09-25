---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.45.0
date: 2026-09-25
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.45.0)
1. **OAuth 2.0 Token Revocation & Introspection Studio (`OauthRevocationIntrospectionLab.jsx` & `oauthRevocationIntrospectionEngine.js`)**: RFC 7662 Token Introspection am API Gateway und RFC 7009 Token Revocation mit automatischer Kaskadierung von Refresh-Token-Entwertungen.
2. **RAID 6 Dual-Parity & Galois Field GF(2^8) Studio (`Raid6GaloisLab.jsx` & `raid6GaloisEngine.js`)**: P (XOR) & Q (Reed-Solomon Galois-Feld Polynom Multiplikation mit Generator $g=2$) Paritätsberechnung und simultane Rekonstruktion zweier Festplattenausfälle.
3. **SQLite Web Worker Sandbox (`SqliteWorkerStudioLab.jsx` & `sqliteWorkerBridge.js`)**: Asynchrone Auslagerung rechenintensiver SQL-Abfragen in einen Dedicated Web Worker zur Vermeidung von UI-Jank und Frame-Drops bei 60 FPS.
4. **IHK Fertigungs- & Zuschlagskalkulation Studio (`WisoZuschlagskalkulationLab.jsx` & `wisoZuschlagskalkulationEngine.js`)**: Vollständiges KLR-Kalkulationsschema von Material- und Fertigungsgemeinkosten bis zum Bar- und Bruttoverkaufspreis.
5. **Clean Architecture & Hexagonal Ports/Adapters Linter (`CleanArchLab.jsx` & `cleanArchEngine.js`)**: Konzentrisches 4-Schichten-Modell (Entities, Use Cases, Adapters, Frameworks) mit Dependency Rule DIP Linter und Zyklenerkennung.
6. **Linux Network Namespaces, veth & Bridge Studio (`LinuxNetNsLab.jsx` & `linuxNetNsEngine.js`)**: Isolation von Netzwerk-Stacks, Virtual Ethernet Pairs, Linux Bridge br0 Switching, iptables MASQUERADE und ICMP Ping Packet Walk.
7. **IHK Mehrstufige Deckungsbeitragsrechnung & Break-Even (`WisoMultiContributionLab.jsx` & `wisoMultiContributionEngine.js`)**: DB I bis IV Fixkosten-Kaskade, Sortimentsrechnung und Sicherheitskoeffizient.
8. **IHK Schwachstellen-Audit & Adaptiver Lernassistent (`IhkWeaknessAuditLab.jsx` & `ihkWeaknessAuditEngine.js`)**: LF1-LF12 Fehleranalyse, Lückenerkennung und automatischer Drill-Generator.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.45.0)
- **Unit-Tests**: 898 bestandene Tests in 122 Test-Dateien (100% Erfolgsquote, +32 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 485 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (207 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 102 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, keine Zoom-Blocker)

