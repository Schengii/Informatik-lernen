---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.60.0
date: 2026-09-28
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.60.0)
1. **IHK WISO Doppelte Buchführung – T-Konten & Buchungssätze (`WisoBookkeepingLab.jsx` & `wisoBookkeepingEngine.js`)**: Didaktisches Buchführungs-Studio nach SKR03. T-Konten-Visualizer mit Soll/Haben-Buchungsregeln, interaktiver Buchungssatz-Builder (7 IHK-typische Szenarien: Wareneinkauf, Lohnzahlung, AfA, ...), Echtzeit-Validierung und Jahresabschluss (GuV & Schlussbilanz) mit 65 XP Belohnung.
2. **IHK WISO Betriebsabrechnungsbogen (BAB) & Zuschlagskalkulation (`WisoBabLab.jsx` & `wisoBabEngine.js`)**: Grafischer BAB mit 5 Kostenarten auf 4 Kostenstellen (Material, Fertigung, Verwaltung, Vertrieb), automatische Zuschlagssatz-Berechnung (MGK%, FGK%, VwGK%, VtrGK%) und vollständige Zuschlagskalkulation mit Angebotspreis-Ermittlung mit 65 XP Belohnung.
3. **Kubernetes Gateway API & Envoy Traffic Splitting Studio (`K8sGatewayApiLab.jsx` & `k8sGatewayApiEngine.js`)**: Didaktisches Cloud-Native- und Ingress-Architektur-Studio (`gateway.networking.k8s.io/v1`). Gewichtetes Canary Traffic Splitting (80/20), Header-Matching (`X-Canary: beta`), Traffic Shadowing (Mirroring), 1000-Request Live-Simulation und 1-Klick YAML-Export mit 65 XP Belohnung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.60.0)
- **Unit- & Integrationstests**: 1264 bestandene Tests in 164 Test-Dateien (100% Erfolgsquote, +42 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 604 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (247 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 113.07 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
