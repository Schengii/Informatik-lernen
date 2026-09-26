---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.57.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.57.0)
1. **IHK Projektantrag PDF- & Dokumentations-Generator (`IhkProposalPdfLab.jsx` & `ihkProposalExporterEngine.js`)**: Offizielles Prüfungs- und Dokumentations-Studio für die IHK Abschlussprüfung (AP2 Teil A Projektarbeit nach AO 2020). Strukturierte Antragsgenerierung für FIAE, FISI, FIDP und IT-SE, Phasenbudgetierung, Art. 32 DSGVO TOMs und 1-Klick A4-PDF- sowie Markdown-Export mit 60 XP Belohnung.
2. **BGP Anycast & DDoS Flow-Scrubber Studio (`BgpAnycastDdosLab.jsx` & `ddosScrubberEngine.js`)**: Didaktisches Netzwerk- und Cyber-Security-Studio für globale Ingress-Verkehrsverteilung und DDoS-Abwehr über weltweite Edge-PoPs (Frankfurt, Amsterdam, New York, Tokio), Linux Kernel SYN-Cookies (`tcp_syncookies=1`), FlowSpec Token-Bucket Rate-Limiting und BGP Route Withdrawal bei Standortüberlastung mit 65 XP Belohnung.
3. **IHK WISO Personalbedarfsplanung & HR-Kennzahlen Studio (`WisoPersonalPlanungLab.jsx` & `wisoPersonalPlanungEngine.js`)**: Didaktisches HR- und Controlling-Studio für die IHK Abschlussprüfung (AP2 WISO). Ermittlung von Brutto- und Netto-Personalbedarf, Fluktuationsraten nach ZVEI- und BDA-Formel sowie Krankenquote mit 60 XP Belohnung.
4. **OAuth 2.1 & RFC 9449 DPoP Sender-Constrained Security Studio (`Oauth21DpopLab.jsx` & `oauth21DpopEngine.js`)**: Didaktisches Cloud- und API-Security-Studio nach den neuesten OAuth 2.1 Richtlinien und RFC 9449. Verbot von Implicit Grant & ROPC, erzwungenes PKCE mit SHA-256 (`S256`), striktes Redirect-URI Matching und kryptographische Token-Bindung (DPoP Proof) mit 65 XP Belohnung.
5. **IHK WISO Rechtsformen & Haftungs-Entscheidungsmatrix (`WisoCompanyFormsLab.jsx` & `wisoCompanyFormsEngine.js`)**: Systematischer Vergleich (Einzelunternehmen, e.K., GbR, OHG, KG, UG, GmbH, AG), Mindeststammkapital, Haftungsumfang, Handelsregistereintrag (HRA vs. HRB) und interaktiver Gründungsfilter mit 60 XP Belohnung.
6. **Mutual TLS (mTLS) & Zero-Trust Service-Mesh Studio (`MtlsZtnaLab.jsx` & `mtlsZtnaEngine.js`)**: Didaktisches Cloud-Native Cyber-Security-Studio nach RFC 8446 für Microservice-Kommunikation mit gegenseitiger X.509 Zertifikatsprüfung, CRL-Sperren und RBAC-Richtlinien.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.57.0)
- **Unit- & Integrationstests**: 1162 bestandene Tests in 155 Test-Dateien (100% Erfolgsquote, +15 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 583 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (240 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 111.11 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
