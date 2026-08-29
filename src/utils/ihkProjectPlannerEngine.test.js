import { describe, it, expect } from 'vitest';
import {
  validatePhasePlanning,
  calculateNWA,
  calculateEconomicFeasibility,
  DEFAULT_PHASES,
  generateDocumentationMarkdown
} from './ihkProjectPlannerEngine';

describe('IHK Project Planner & NWA Engine', () => {
  it('validates 80h FIAE phase distribution', () => {
    const res = validatePhasePlanning('fiae', DEFAULT_PHASES);
    expect(res.totalHours).toBe(80);
    expect(res.maxHours).toBe(80);
    expect(res.isValid).toBe(true);
    expect(res.errors.length).toBe(0);
  });

  it('detects hour discrepancies for 40h FISI projects', () => {
    const res = validatePhasePlanning('fisi', DEFAULT_PHASES); // 80h passed instead of 40h
    expect(res.isValid).toBe(false);
    expect(res.errors[0]).toContain('40h sind für Fachinformatiker/in Systemintegration');
  });

  it('calculates Nutzwertanalyse (NWA) and handles knock-out criteria', () => {
    const criteria = [
      { id: 'c1', name: 'Performance', weight: 40, isKnockout: false },
      { id: 'c2', name: 'OpenSource / Lizenzkosten', weight: 30, isKnockout: false },
      { id: 'c3', name: 'DSGVO Konformität', weight: 30, isKnockout: true, minScore: 6 }
    ];

    const options = [
      { id: 'opt1', name: 'Cloud SaaS Vendor', scores: { c1: 9, c2: 4, c3: 3 } }, // Fails Knockout
      { id: 'opt2', name: 'Self-Hosted OpenSource Stack', scores: { c1: 8, c2: 9, c3: 9 } }
    ];

    const nwa = calculateNWA(criteria, options);
    expect(nwa.winner.name).toBe('Self-Hosted OpenSource Stack');
    expect(nwa.results.find((r) => r.id === 'opt1').isKnockoutFailed).toBe(true);
  });

  it('calculates economic feasibility, amortization and ROI', () => {
    const econ = calculateEconomicFeasibility({
      hourlyRate: 70,
      hours: 80,
      materialCosts: 1000,
      annualSavings: 12000
    });

    expect(econ.laborCosts).toBe(5600);
    expect(econ.totalInvestment).toBe(6600);
    expect(econ.monthlySavings).toBe(1000);
    expect(econ.amortizationMonths).toBe(6.6);
    expect(econ.net3YearBenefit).toBe(29400);
    expect(econ.roiPercentage).toBeGreaterThan(400);
  });

  it('generates structured documentation markdown', () => {
    const doc = generateDocumentationMarkdown({
      projectTitle: 'Automatisierte CI/CD Pipeline',
      studentName: 'Max Mustermann',
      company: 'Tech Corp',
      professionId: 'fiae',
      phases: DEFAULT_PHASES,
      nwa: { winner: { name: 'Docker Stack', weightedScore: 8.5 } },
      econ: { totalInvestment: 6000, laborCosts: 5000, materialCosts: 1000, annualSavings: 12000, amortizationMonths: 6, roiPercentage: 500, net3YearBenefit: 30000 }
    });

    expect(doc).toContain('Fachinformatiker/in Anwendungsentwicklung (80 Stunden)');
    expect(doc).toContain('Max Mustermann');
    expect(doc).toContain('Nutzwertanalyse');
  });
});
