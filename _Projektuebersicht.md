---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.53.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.53.0)
1. **Routing-Algorithmen: Dijkstra (SPF) & Spanning Tree (STP IEEE 802.1D) (`RoutingDijkstraLab.jsx` & `routingDijkstraEngine.js`)**: OSPF Shortest Path First mit visualisierter Schritt-für-Schritt-Relaxation, Pfad-Rekonstruktion und kumulierten Metrikkosten. Spanning Tree Loop Prevention mit Root-Bridge-Wahl (Bridge-ID Priorität + MAC), Root-Ports und Discarding/Blocking redundanter Links zur Eliminierung von Broadcast-Storms mit 60 XP Belohnung.
2. **RFC 9111 HTTP Caching Studio (`HttpCachingLab.jsx` & `httpCachingEngine.js`)**: Steuerung von `max-age`, `no-cache`, `no-store` und bedingten Anfragen (`If-None-Match` vs. `ETag`) mit Demonstration des 0-Byte-Payload HTTP 304 Not Modified Transfers und Browser-Memory-Cache-Hits mit 60 XP Belohnung.
3. **Adaptiver IHK Prüfungspfad & Countdown-Planer (`ExamReadinessLab.jsx` & `examReadinessEngine.js`)**: Automatischer Countdown bis zum nächsten offiziellen Prüfungstermin (Mai/November), gewichteter Readiness-Score (0–100%) über alle IHK-Prüfungsbereiche (AP1, AP2 B1, AP2 B2, WiSo, Projekt), Notenprognose und gezielte Empfehlungen mit 60 XP Belohnung.
4. **Anki & CSV Flashcard Export Engine (`FlashcardsModal.jsx` & `flashcardIoEngine.js`)**: 1-Klick-Export aller integrierten Spaced-Repetition-Lernkarten als Anki TSV-Deck (`.txt`) oder CSV (`.csv`) für Excel und mobile Apps.
5. **IHK Mündliche Ergänzungsprüfung (MEP) Simulator (`IhkMepSimulatorLab.jsx` & `ihkMepEngine.js`)**: Didaktisches Prüfungs- und Notfall-Studio nach BBiG § 198 und Prüfungsordnung AO 2020 mit 2:1 Notenberechnung und 15-Minuten-Prüfungsfragensimulation.
6. **WISO Finanzierungsvergleich: Kauf vs. Kredit vs. Leasing (`WisoFinancingLab.jsx` & `wisoFinancingEngine.js`)**: Barzahlung mit Skonto, Ratendarlehen mit degressiven Zinsen und Operating Leasing mit Tax Shield (§ 7 EStG).

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.53.0)
- **Unit- & Integrationstests**: 1040 bestandene Tests in 147 Test-Dateien (100% Erfolgsquote, +11 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 553 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (231 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 111.01 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
