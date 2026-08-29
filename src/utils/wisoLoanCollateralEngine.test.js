import { describe, it, expect } from 'vitest';
import { calculateLoanSchedule, IHK_COLLATERAL_TYPES } from './wisoLoanCollateralEngine';

describe('IHK WISO Loan & Collateral Engine', () => {
  it('calculates equal installment schedule (Ratentilgung)', () => {
    const res = calculateLoanSchedule({
      loanAmount: 100000,
      interestRatePercent: 5,
      years: 5,
      loanType: 'installment'
    });

    expect(res.schedule.length).toBe(5);
    expect(res.schedule[0].tilgung).toBe(20000);
    expect(res.schedule[0].zinsen).toBe(5000);
    expect(res.schedule[4].endDebt).toBe(0);
  });

  it('calculates annuity loan with constant total annual rate', () => {
    const res = calculateLoanSchedule({
      loanAmount: 50000,
      interestRatePercent: 4,
      years: 4,
      loanType: 'annuity'
    });

    expect(res.schedule.length).toBe(4);
    expect(res.schedule[0].rateTotal).toBeCloseTo(res.schedule[1].rateTotal, -1);
    expect(res.schedule[3].endDebt).toBe(0);
  });

  it('contains valid IHK collateral classifications', () => {
    expect(IHK_COLLATERAL_TYPES.length).toBeGreaterThanOrEqual(4);
    const buergschaft = IHK_COLLATERAL_TYPES.find(c => c.name === 'Bürgschaft');
    expect(buergschaft.category).toBe('Personalsicherheit');
    expect(buergschaft.akzessorisch).toBe(true);
  });
});
