import { describe, it, expect } from 'vitest';
import { evaluateDsfaCriteria, generateTomCatalogue } from './dsgvoDsfaTomEngine';

describe('DSGVO DSFA & TOM Engine', () => {
  it('evaluates threshold criteria and determines if DSFA is mandatory', () => {
    const safe = evaluateDsfaCriteria({});
    expect(safe.isDsfaMandatory).toBe(false);
    expect(safe.riskLevel).toBe('Niedrig');

    const highRisk = evaluateDsfaCriteria({
      special_data: true,
      auto_decision: true
    });
    expect(highRisk.isDsfaMandatory).toBe(true);
    expect(highRisk.score).toBe(6);
  });

  it('generates complete TOM catalogue categorized by Art. 32 DSGVO', () => {
    const toms = generateTomCatalogue({ encryption: true, backups: true });
    expect(toms.length).toBe(4);
    expect(toms[0].category).toContain('Vertraulichkeit');
    expect(toms[0].measures[0]).toContain('AES-256');
  });
});
