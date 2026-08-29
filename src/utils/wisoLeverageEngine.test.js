import { describe, it, expect } from 'vitest';
import { calculateLeverageEffect } from './wisoLeverageEngine';

describe('IHK WISO Leverage Effect & Rentabilität Engine', () => {
  it('calculates positive leverage effect when GKR > interest rate', () => {
    const res = calculateLeverageEffect({
      eigenkapital: 500000,
      fremdkapital: 500000,
      fremdkapitalZinsPercent: 4.0,
      gesamtkapitalRentabilitaetPercent: 8.0
    });

    expect(res.gesamtkapital).toBe(1000000);
    expect(res.ebit).toBe(80000);
    expect(res.fkZinsen).toBe(20000);
    expect(res.reingewinn).toBe(60000);
    expect(res.ekrPercent).toBe(12.0); // 8% + (8% - 4%) * 1.0 = 12%
    expect(res.leverageStatus).toBe('POSITIVE');
  });

  it('detects negative leverage effect (Zinsfalle) when GKR < interest rate', () => {
    const res = calculateLeverageEffect({
      eigenkapital: 500000,
      fremdkapital: 500000,
      fremdkapitalZinsPercent: 10.0,
      gesamtkapitalRentabilitaetPercent: 6.0
    });

    expect(res.ekrPercent).toBe(2.0); // 6% + (6% - 10%) * 1.0 = 2%
    expect(res.leverageStatus).toBe('NEGATIVE');
  });
});
