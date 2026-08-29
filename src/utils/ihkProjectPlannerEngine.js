// IHK Abschlussprüfungs-Projektplaner & Nutzwertanalyse Engine (AO 2020)
// Unterstützt FIAE, FISI, FIDP, FIDV, ITSE und Kaufleute mit Phasenprüfung, NWA und ROI

export const IHK_PROFESSIONS = {
  fiae: { id: 'fiae', title: 'Fachinformatiker/in Anwendungsentwicklung', maxHours: 80, recommendedPhases: [12, 16, 32, 10, 10] },
  fisi: { id: 'fisi', title: 'Fachinformatiker/in Systemintegration', maxHours: 40, recommendedPhases: [6, 8, 16, 5, 5] },
  fidp: { id: 'fidp', title: 'Fachinformatiker/in Daten- & Prozessanalyse', maxHours: 80, recommendedPhases: [14, 16, 30, 10, 10] },
  fidv: { id: 'fidv', title: 'Fachinformatiker/in Digitale Vernetzung', maxHours: 80, recommendedPhases: [12, 16, 32, 10, 10] },
  itse: { id: 'itse', title: 'IT-Systemelektroniker/in', maxHours: 40, recommendedPhases: [6, 8, 16, 5, 5] }
};

export const DEFAULT_PHASES = [
  { id: 'p1', name: '1. Analyse & Wirtschaftlichkeit', hours: 12, desc: 'Ist-Analyse, Soll-Konzept, Nutzwertanalyse, Make-or-Buy' },
  { id: 'p2', name: '2. Entwurf & Design', hours: 16, desc: 'Datenbank-Design, Architekturdiagramme, Schnittstellen-Spezifikation' },
  { id: 'p3', name: '3. Realisierung & Implementierung', hours: 32, desc: 'Core-Features programmieren, Konfiguration, CI/CD Pipeline' },
  { id: 'p4', name: '4. Qualitätssicherung & Testen', hours: 10, desc: 'Unit-, Integrations- & Lasttests, Bugfixing, Abnahme' },
  { id: 'p5', name: '5. Dokumentation & Übergabe', hours: 10, desc: 'Entwickler- & Kundendokumentation, Projektbericht, Fazit' }
];

export function validatePhasePlanning(professionId, phases) {
  const profession = IHK_PROFESSIONS[professionId] || IHK_PROFESSIONS.fiae;
  const maxHours = profession.maxHours;
  const totalHours = phases.reduce((sum, p) => sum + (Number(p.hours) || 0), 0);
  
  const warnings = [];
  const errors = [];

  if (totalHours !== maxHours) {
    errors.push(`Gesamtdauer beträgt ${totalHours}h (Exakt ${maxHours}h sind für ${profession.title} vorgeschrieben!).`);
  }

  // Check individual phase percentages
  const p3 = phases.find((p) => p.id === 'p3' || p.name.includes('Realisierung'));
  if (p3) {
    const realShare = (p3.hours / (totalHours || 1)) * 100;
    if (realShare < 35) {
      warnings.push('Die Realisierungsphase ist mit unter 35% relativ kurz bemessen.');
    } else if (realShare > 55) {
      warnings.push('Die Realisierungsphase nimmt über 55% ein – Analyse und Dokumentation könnten zu kurz kommen.');
    }
  }

  const p5 = phases.find((p) => p.id === 'p5' || p.name.includes('Dokumentation'));
  if (p5 && (p5.hours / (totalHours || 1)) * 100 < 10) {
    warnings.push('Für die Dokumentation sollten mindestens 10–15% der Gesamtzeit eingeplant werden.');
  }

  return {
    totalHours,
    maxHours,
    isValid: errors.length === 0,
    errors,
    warnings,
    distribution: phases.map((p) => ({
      ...p,
      percentage: totalHours > 0 ? ((p.hours / totalHours) * 100).toFixed(1) : 0
    }))
  };
}

export function calculateNWA(criteria, options) {
  const totalWeight = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);

  const results = options.map((opt) => {
    let weightedSum = 0;
    let failedKnockout = null;

    criteria.forEach((crit) => {
      const score = Number(opt.scores?.[crit.id] ?? 0);
      const normalizedWeight = totalWeight > 0 ? crit.weight / totalWeight : 0;
      weightedSum += score * normalizedWeight;

      if (crit.isKnockout && score < (crit.minScore || 5)) {
        failedKnockout = crit.name;
      }
    });

    return {
      ...opt,
      weightedScore: Number(weightedSum.toFixed(2)),
      isKnockoutFailed: !!failedKnockout,
      failedKnockoutReason: failedKnockout
    };
  });

  const sorted = [...results].sort((a, b) => {
    if (a.isKnockoutFailed && !b.isKnockoutFailed) return 1;
    if (!a.isKnockoutFailed && b.isKnockoutFailed) return -1;
    return b.weightedScore - a.weightedScore;
  });

  const winner = sorted.length > 0 && !sorted[0].isKnockoutFailed ? sorted[0] : null;

  return {
    totalWeight,
    results: sorted,
    winner
  };
}

export function calculateEconomicFeasibility({ hourlyRate = 65, hours = 80, materialCosts = 1200, annualSavings = 8400 }) {
  const laborCosts = Number(hourlyRate) * Number(hours);
  const totalInvestment = laborCosts + Number(materialCosts);
  const monthlySavings = Number(annualSavings) / 12;
  const amortizationMonths = monthlySavings > 0 ? (totalInvestment / monthlySavings).toFixed(1) : '∞';
  
  // 3-Year ROI calculation
  const total3YearSavings = Number(annualSavings) * 3;
  const net3YearBenefit = total3YearSavings - totalInvestment;
  const roiPercentage = totalInvestment > 0 ? ((net3YearBenefit / totalInvestment) * 100).toFixed(1) : 0;

  return {
    laborCosts,
    materialCosts: Number(materialCosts),
    totalInvestment,
    annualSavings: Number(annualSavings),
    monthlySavings: Number(monthlySavings.toFixed(2)),
    amortizationMonths: Number(amortizationMonths),
    net3YearBenefit,
    roiPercentage: Number(roiPercentage)
  };
}

export function generateDocumentationMarkdown({ projectTitle, studentName, company, professionId, phases, nwa, econ }) {
  const profession = IHK_PROFESSIONS[professionId] || IHK_PROFESSIONS.fiae;
  const dateStr = new Date().toLocaleDateString('de-DE');

  return `# IHK Projektdokumentation: ${projectTitle || 'Optimierung & Modernisierung der Systemlandschaft'}
**Prüfungsteil B (Betriebliche Projektarbeit)**
- **Verfasser/in:** ${studentName || 'IT-Auszubildende/r'}
- **Ausbildungsberuf:** ${profession.title} (${profession.maxHours} Stunden)
- **Ausbildungsbetrieb:** ${company || 'Musterfirma GmbH'}
- **Datum:** ${dateStr}

---

## 1. Projektdefinition & Zielsetzung
### 1.1 Ausgangslage & Problemstellung (Ist-Analyse)
In der aktuellen Umgebung traten wiederkehrende manuelle Aufwände und Engpässe auf. Ziel dieses Projektes ist es, die Prozesse durch eine moderne, automatisierte und skalierbare Lösung abzulösen.

### 1.2 Projektziele & Soll-Konzept
- Einführung einer automatisierten, fehlertoleranten Software-/Systemarchitektur.
- Erreichung einer signifikanten Reduzierung manueller Eingriffe.
- Einhaltung der geltenden Datenschutz- und Sicherheitsstandards.

---

## 2. Projektphasen & Zeitplanung
Gesamtdauer: **${phases.reduce((sum, p) => sum + (Number(p.hours) || 0), 0)} Stunden** (Soll: ${profession.maxHours}h)

| Phase | Bezeichnung | Geplante Dauer | Anteil |
| :--- | :--- | :--- | :--- |
${phases.map((p) => `| ${p.id} | ${p.name} | ${p.hours}h | ${((p.hours / profession.maxHours) * 100).toFixed(1)}% |`).join('\n')}

---

## 3. Entscheidungsfindung & Nutzwertanalyse (NWA)
Gewählte Lösung: **${nwa?.winner?.name || 'Lösung A'}** (Gesamtbewertung: ${nwa?.winner?.weightedScore || '0'}/10 Punkte).

| Kriterium | Gewichtung | ${nwa?.results?.map((r) => r.name).join(' | ') || 'Optionen'} |
| :--- | :--- | :--- |
${nwa?.criteria?.map((c) => `| ${c.name} | ${c.weight}% | ${nwa.results.map((r) => `${r.scores[c.id] ?? '-'}/10`).join(' | ')} |`).join('\n') || ''}

---

## 4. Wirtschaftlichkeitsbetrachtung & Amortisation
- **Gesamte Projektkosten (Investition):** ${econ.totalInvestment.toLocaleString('de-DE')} € (${econ.laborCosts.toLocaleString('de-DE')} € Personalkosten + ${econ.materialCosts.toLocaleString('de-DE')} € Sachmittel)
- **Jährliche Einsparung:** ${econ.annualSavings.toLocaleString('de-DE')} € / Jahr
- **Amortisationsdauer:** **${econ.amortizationMonths} Monate**
- **3-Jahres Return on Investment (ROI):** **${econ.roiPercentage}%** (${econ.net3YearBenefit.toLocaleString('de-DE')} € Reingewinn nach 36 Monaten)

---

## 5. Fazit & Projektergebnis
Das Projekt wurde im vorgegebenen Zeitrahmen von ${profession.maxHours} Stunden erfolgreich realisiert und erfüllt alle geforderten Abnahmekriterien.`;
}
