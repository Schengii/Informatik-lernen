import { describe, it, expect } from 'vitest';
import { calculateNoticePeriod, evaluateProtection } from './wisoLaborLawEngine';

describe('wisoLaborLawEngine', () => {
  it('berechnet Probezeit-Kündigungsfrist (2 Wochen zu jedem Tag)', () => {
    const res = calculateNoticePeriod(0, true, false);
    expect(res.termWeeks).toBe(2);
    expect(res.legalBasis).toContain('622 Abs. 3');
  });

  it('berechnet Grundkündigungsfrist für Arbeitnehmer (4 Wochen zum 15./Monatsende)', () => {
    const res = calculateNoticePeriod(6, false, true);
    expect(res.termWeeks).toBe(4);
    expect(res.termMonths).toBe(0);
    expect(res.targetDateDescription).toContain('15.');
  });

  it('berechnet gestaffelte Fristen für Arbeitgeber nach Betriebszugehörigkeit', () => {
    expect(calculateNoticePeriod(1, false, false).termWeeks).toBe(4);
    expect(calculateNoticePeriod(3, false, false).termMonths).toBe(1);
    expect(calculateNoticePeriod(5, false, false).termMonths).toBe(2);
    expect(calculateNoticePeriod(8, false, false).termMonths).toBe(3);
    expect(calculateNoticePeriod(10, false, false).termMonths).toBe(4);
    expect(calculateNoticePeriod(12, false, false).termMonths).toBe(5);
    expect(calculateNoticePeriod(15, false, false).termMonths).toBe(6);
    expect(calculateNoticePeriod(20, false, false).termMonths).toBe(7);
  });

  it('erkennt besonderen Kündigungsschutz (Mutterschutz, Betriebsrat, Azubi)', () => {
    const prot = evaluateProtection({
      employeeCount: 20,
      employmentMonths: 12,
      isPregnant: true,
      hasDisability: false,
      isWorksCouncilMember: false,
      isApprenticeAfterProbation: false
    });

    expect(prot.hasSpecialProtection).toBe(true);
    expect(prot.specialProtectionReasons[0]).toContain('MuSchG');
  });

  it('erkennt allgemeinen KSchG-Kündigungsschutz vs. Kleinbetrieb', () => {
    const normal = evaluateProtection({
      employeeCount: 15,
      employmentMonths: 7,
      isPregnant: false,
      hasDisability: false,
      isWorksCouncilMember: false,
      isApprenticeAfterProbation: false
    });
    expect(normal.hasGeneralProtection).toBe(true);
    expect(normal.requiresSocialJustification).toBe(true);

    const small = evaluateProtection({
      employeeCount: 8,
      employmentMonths: 12,
      isPregnant: false,
      hasDisability: false,
      isWorksCouncilMember: false,
      isApprenticeAfterProbation: false
    });
    expect(small.hasGeneralProtection).toBe(false);
  });
});
