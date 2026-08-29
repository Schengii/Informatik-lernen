import { describe, it, expect } from 'vitest';
import { analyzeAbcXyzMaterials } from './wisoAbcXyzEngine';

describe('IHK WISO ABC/XYZ Material Engine', () => {
  it('correctly ranks and categorizes materials into A, B, C classes based on cumulative value', () => {
    const materials = [
      { id: 'M1', name: 'High-End GPU Server Module', annualQuantity: 50, unitPrice: 3000, variationCoeff: 0.1 }, // 150.000 (75%) -> A
      { id: 'M2', name: 'SSD NVMe 4TB', annualQuantity: 200, unitPrice: 150, variationCoeff: 0.25 }, // 30.000 (15%) -> B
      { id: 'M3', name: 'Patchkabel RJ45 2m', annualQuantity: 2000, unitPrice: 5, variationCoeff: 0.05 }, // 10.000 (5%) -> C
      { id: 'M4', name: 'Kabelbinder 100er Pack', annualQuantity: 1000, unitPrice: 10, variationCoeff: 0.4 } // 10.000 (5%) -> C
    ];

    const res = analyzeAbcXyzMaterials(materials);
    expect(res.totalValue).toBe(200000);
    expect(res.items[0].id).toBe('M1');
    expect(res.items[0].abcClass).toBe('A');
    expect(res.items[0].xyzClass).toBe('X');
    expect(res.items[0].recommendation).toContain('Just-in-Time');

    expect(res.items[1].id).toBe('M2');
    expect(res.items[1].abcClass).toBe('B');

    expect(res.items[2].id).toBe('M3');
    expect(res.items[2].abcClass).toBe('B');

    expect(res.items[3].id).toBe('M4');
    expect(res.items[3].abcClass).toBe('C');
  });

  it('handles empty input gracefully', () => {
    const res = analyzeAbcXyzMaterials([]);
    expect(res.items.length).toBe(0);
    expect(res.totalValue).toBe(0);
  });
});
