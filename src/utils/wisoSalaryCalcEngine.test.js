import { describe, it, expect } from 'vitest';
import { calculateSalaryDeductions } from './wisoSalaryCalcEngine';

describe('IHK WISO Salary & Social Security Engine', () => {
  it('calculates net salary and employee contributions for a standard 3500€ salary', () => {
    const res = calculateSalaryDeductions({
      grossSalaryMonthly: 3500,
      taxClass: 1,
      hasChildren: false,
      churchTax: false
    });

    expect(res.gross).toBe(3500);
    expect(res.netSalary).toBeGreaterThan(2000);
    expect(res.totalSocialEmployee).toBeGreaterThan(600);
    expect(res.totalEmployerCost).toBeGreaterThan(4000);
  });

  it('caps social security calculations at the statutory BBG limit', () => {
    const highIncome = calculateSalaryDeductions({
      grossSalaryMonthly: 12000,
      taxClass: 1,
      hasChildren: true
    });

    // BBG KV/PV is 5175€ -> KV and PV contributions should not exceed cap rate
    expect(highIncome.employeeKv).toBeLessThan(5175 * 0.1);
    expect(highIncome.totalEmployerCost).toBeGreaterThan(12000);
  });
});
