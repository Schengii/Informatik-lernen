import { describe, it, expect } from 'vitest';
import { calculateContributionMargin } from './wisoContributionMarginEngine';

describe('IHK WISO Contribution Margin & Break-Even Engine', () => {
  it('calculates multi-stage margins DB I, DB II, DB III and operating profit', () => {
    const res = calculateContributionMargin({
      unitsSold: 5000,
      unitPrice: 100,
      variableUnitCost: 40,
      productFixedCosts: 50000,
      divisionFixedCosts: 30000,
      companyFixedCosts: 70000
    });

    expect(res.dbPerUnit).toBe(60);
    expect(res.totalRevenue).toBe(500000);
    expect(res.db1Total).toBe(300000);
    expect(res.db2Total).toBe(250000);
    expect(res.db3Total).toBe(220000);
    expect(res.operatingResult).toBe(150000);
    expect(res.isProfitable).toBe(true);
  });

  it('computes exact break-even point in units and safety margin', () => {
    const res = calculateContributionMargin({
      unitsSold: 4000,
      unitPrice: 50,
      variableUnitCost: 25,
      productFixedCosts: 25000,
      divisionFixedCosts: 15000,
      companyFixedCosts: 10000 // Total Kf = 50000
    });

    // db = 25, Kf = 50000 -> Break Even = 2000 units
    expect(res.breakEvenUnits).toBe(2000);
    expect(res.safetyMarginPercent).toBe(50);
  });
});
