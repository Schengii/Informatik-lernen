---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.54.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.54.0)
1. **SRP-6a Zero-Knowledge Authentication Studio (`SrpZeroKnowledgeLab.jsx` & `srpAuthEngine.js`)**: Didaktisches Kryptographie- und Authentifizierungs-Studio nach RFC 2945 & RFC 5054. Ephemere Schlüssel ($a, b$), Public Keys ($A, B$), Password Verifier ($v = g^x \pmod N$) und beidseitiger symmetrischer Schlüsseltausch ($S$) ohne Übertragung von Klartext oder Hashes mit Wire-Traffic-Sniffer und 65 XP Belohnung.
2. **IHK WISO Kaufvertragsstörungen & Sachmängelhaftung Studio (`WisoContractBreachLab.jsx` & `wisoContractBreachEngine.js`)**: Gesetzliche Rügefristen nach HGB § 377 (Handelskauf B2B mit unverzüglicher Rügepflicht) vs. BGB § 438 (B2C Verbraucherschutz), Vorrang der Nacherfüllung (§ 439 BGB), Freischaltung nachrangiger Käuferrechte nach 2 fehlgeschlagenen Nachbesserungsversuchen (§ 440 BGB) und Bagatellmangelprüfung (§ 323 Abs. 5 BGB) mit 60 XP Belohnung.
3. **Routing-Algorithmen: Dijkstra (SPF) & Spanning Tree (STP IEEE 802.1D) (`RoutingDijkstraLab.jsx` & `routingDijkstraEngine.js`)**: OSPF Shortest Path First mit visualisierter Schritt-für-Schritt-Relaxation, Pfad-Rekonstruktion und kumulierten Metrikkosten. Spanning Tree Loop Prevention mit Root-Bridge-Wahl (Bridge-ID Priorität + MAC), Root-Ports und Discarding/Blocking redundanter Links.
4. **RFC 9111 HTTP Caching Studio (`HttpCachingLab.jsx` & `httpCachingEngine.js`)**: Steuerung von `max-age`, `no-cache`, `no-store` und bedingten Anfragen (`If-None-Match` vs. `ETag`) mit Demonstration des 0-Byte-Payload HTTP 304 Not Modified Transfers und Browser-Memory-Cache-Hits.
5. **Adaptiver IHK Prüfungspfad & Countdown-Planer (`ExamReadinessLab.jsx` & `examReadinessEngine.js`)**: Automatischer Countdown bis zum nächsten offiziellen Prüfungstermin (Mai/November), gewichteter Readiness-Score (0–100%) über alle IHK-Prüfungsbereiche, Notenprognose und gezielte Empfehlungen.
6. **Anki & CSV Flashcard Export Engine (`FlashcardsModal.jsx` & `flashcardIoEngine.js`)**: 1-Klick-Export aller integrierten Spaced-Repetition-Lernkarten als Anki TSV-Deck (`.txt`) oder CSV (`.csv`) für Excel und mobile Apps.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.54.0)
- **Unit- & Integrationstests**: 1046 bestandene Tests in 149 Test-Dateien (100% Erfolgsquote, +6 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 557 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (233 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 111.32 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
