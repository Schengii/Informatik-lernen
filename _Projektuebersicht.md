---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.59.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.59.0)
1. **Kubernetes Gateway API & Envoy Traffic Splitting Studio (`K8sGatewayApiLab.jsx` & `k8sGatewayApiEngine.js`)**: Didaktisches Cloud-Native- und Ingress-Architektur-Studio (`gateway.networking.k8s.io/v1`). Gewichtetes Canary Traffic Splitting (80/20), Header-Matching (`X-Canary: beta`), Traffic Shadowing (Mirroring), 1000-Request Live-Simulation und 1-Klick YAML-Export für `HTTPRoute` und Envoy-Proxy mit 65 XP Belohnung.
2. **IHK WISO Deckungsbeitrag Stufe 2 & Break-Even-Point Solver (`WisoBreakEvenLab.jsx` & `wisoBreakEvenEngine.js`)**: Didaktisches Kostenrechnungs- und Controlling-Studio. Mehrstufige Fixkostenspaltung (Erzeugnisfixkosten $K_{f1}$ zu DB II und Unternehmensfixkosten $K_{f2}$ zum Betriebsergebnis), Engpassoptimierung via relativem Deckungsbeitrag ($db_{\text{rel}} = db / t$) und Break-Even-Point-Kalkulation (Menge und Umsatz) mit 65 XP Belohnung.
3. **DNSSEC KSK & ZSK Key Rollover & Chain-of-Trust Simulator (`DnssecRolloverLab.jsx` & `dnssecRolloverEngine.js`)**: Didaktisches Internet-Infrastruktur- und Kryptographie-Studio (RFC 4034/4035 & RFC 5011). Schrittweise Simulation von ZSK Pre-Publish Rollover und KSK Double-DS Rollover mit Parent-Zone DS-Publikation, TTL-Wartezeiten und lückenloser Validierung der Vertrauenskette mit 65 XP Belohnung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.59.0)
- **Unit- & Integrationstests**: 1222 bestandene Tests in 162 Test-Dateien (100% Erfolgsquote, +45 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 604 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (247 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 113.07 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
