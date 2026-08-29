import { describe, it, expect } from 'vitest';
import { BPlusTreeSimulator, HashIndexSimulator } from './dbIndexEngine';

describe('Database Index B+ Tree vs Hash Index Engine', () => {
  it('performs logarithmic point and range searches in B+ Tree', () => {
    const btree = new BPlusTreeSimulator();
    [5, 10, 15, 20, 25, 30, 35, 40].forEach(k => btree.insert(k));

    const searchRes = btree.search(25);
    expect(searchRes.found).toBe(true);
    expect(searchRes.timeComplexity).toBe('O(log N)');

    const rangeRes = btree.rangeSearch(10, 30);
    expect(rangeRes.matches).toEqual([10, 15, 20, 25, 30]);
    expect(rangeRes.strategy).toContain('Leaf-Pointer');
  });

  it('performs O(1) lookups in Hash Index but rejects range scans', () => {
    const hashIdx = new HashIndexSimulator(8);
    hashIdx.insert(42, 'row_42');
    hashIdx.insert(18, 'row_18');

    const pointRes = hashIdx.search(42);
    expect(pointRes.found).toBe(true);
    expect(pointRes.timeComplexity).toBe('O(1)');

    const rangeRes = hashIdx.rangeSearch(10, 50);
    expect(rangeRes.supported).toBe(false);
    expect(rangeRes.timeComplexity).toBe('O(N)');
  });
});
