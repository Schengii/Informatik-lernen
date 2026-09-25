---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.48.0
date: 2026-09-25
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.48.0)
1. **Linux SELinux & AppArmor Mandatory Access Control (MAC) Studio (`LinuxMacSelinuxLab.jsx` & `linuxMacSelinuxEngine.js`)**: Kernel-Sicherheitsarchitektur nach modernem Linux-Standard. Gegenüberstellung von Discretionary Access Control (DAC: `chmod`/`chown`, Root-Privilegien) und Mandatory Access Control (MAC: Type Enforcement `httpd_t` darf nicht auf `shadow_t` zugreifen, selbst als Root). Enforcing vs. Permissive Modus, Live AVC Audit Denial Logs (`/var/log/audit/audit.log`) und Root-Compromise Mitigation mit 65 XP Belohnung.
2. **DNS Privacy Inspector: DoH & DoT vs. Port 53 (`DnsPrivacyLab.jsx` & `dnsPrivacyEngine.js`)**: Tiefgehende Netzwerksicherheits-Analyse nach RFC 8484 (DNS-over-HTTPS auf Port 443) und RFC 7858 (DNS-over-TLS auf Port 853). Gegenüberstellung zu unverschlüsseltem UDP Port 53, Wire-Format Hex-Dump Inspektion, Schutz vor ISP-Eavesdropping, Zensur und Man-in-the-Middle Manipulationen mit 60 XP Belohnung.
3. **IHK WISO Liquiditätsgrade & Working Capital Studio (`WisoLiquiditaetLab.jsx` & `wisoLiquiditaetEngine.js`)**: Offizielle Bilanz- und Liquiditätsanalyse für AP2 WISO. Exakte Berechnung von Liquidität 1. Grades (Cash Ratio $\ge 20\%$), Liquidität 2. Grades (Quick Ratio $\ge 100\%$), Liquidität 3. Grades (Current Ratio $\ge 150\%$) und Net Working Capital (NWC). Erkennung drohender Zahlungsunfähigkeit nach InsO § 17 mit 60 XP Belohnung.
4. **RAG Semantic Cache & Vector Similarity Studio (`RagSemanticCacheLab.jsx` & `ragSemanticCacheEngine.js`)**: Optimierungs-Studio für moderne Enterprise-KI- und RAG-Pipelines. Vektorielles Ähnlichkeits-Caching mit Cosine-Similarity-Schwellenwert. Schnelle Index-Lookups (<10ms) umgehen teure und langsame LLM-Inferenz, sparen 100% Token-Kosten und minimieren Latenzen bei semantisch ähnlichen Nutzeranfragen mit 65 XP Belohnung.
5. **Linux Cgroups v2 & PSI (Pressure Stall Information) Studio (`LinuxPsiCgroupLab.jsx` & `linuxPsiCgroupEngine.js`)**: Kernel-Ressourcenüberwachung nach Linux 5.x. Unterscheidung von `some` vs. `full` Pressure Stalls für CPU, Memory und I/O, CFS Bandbreitendrosselung (`cpu.max`) und Vermeidung von OOM-Kills sowie K8s-Node-Evictions.
6. **IHK Nutzwertanalyse (NWA) Sensitivitäts- & Monte-Carlo Studio (`NwaSensitivityLab.jsx` & `nwaSensitivityEngine.js`)**: DIN/VDI 2225 Entscheidungsmatrix mit 500 probabilistischen Gewichtungs-Variationen zur Absicherung der Entscheidungssicherheit (>70%) gegen subjektive Verzerrungen.
7. **WebRTC STUN/TURN & ICE Candidate Gathering Studio (`WebrtcIceGatheringLab.jsx` & `webrtcIceGatheringEngine.js`)**: RFC 8445 ICE Agent Simulation mit Host, Server Reflexive (STUN) und Relay (TURN) Kandidaten sowie Fallback-Routing bei Symmetric NAT.
8. **WISO Rentabilitätskennzahlen & Leverage-Effekt Studio (`WisoRentabilitaetLeverageLab.jsx` & `wisoRentabilitaetLeverageEngine.js`)**: Bilanzanalyse für die IHK Abschlussprüfung (AP2 WISO). Eigenkapital-, Gesamtkapital- und Umsatzrendite sowie Hebelwirkung von Fremdkapital.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.48.0)
- **Unit- & Integrationstests**: 993 bestandene Tests in 134 Test-Dateien (100% Erfolgsquote, +52 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 521 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (219 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 104 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
