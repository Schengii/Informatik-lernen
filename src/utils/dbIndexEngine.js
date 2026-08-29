/**
 * Database Index Engine: B+ Tree vs. Hash Index
 * Simulates B+ Tree node splitting, internal routing keys, linked leaf nodes for range queries,
 * and Hash Index bucket hashing for O(1) point lookups.
 */

export class BPlusTreeSimulator {
  constructor() {
    this.keys = []; // sorted keys for simplified visual simulation
    this.root = {
      isLeaf: true,
      keys: [10, 20, 30],
      children: []
    };
  }

  insert(key) {
    if (!this.keys.includes(key)) {
      this.keys.push(key);
      this.keys.sort((a, b) => a - b);
    }
    return {
      key,
      treeHeight: Math.ceil(Math.log2(this.keys.length + 1)),
      totalKeys: this.keys.length
    };
  }

  search(key) {
    const found = this.keys.includes(key);
    const steps = Math.min(3, Math.ceil(Math.log2(this.keys.length + 1)));
    return {
      key,
      found,
      stepsTaken: steps,
      timeComplexity: 'O(log N)',
      route: ['Root Node [20]', found ? `Leaf Node [${key}]` : 'Not Found']
    };
  }

  rangeSearch(minKey, maxKey) {
    const matches = this.keys.filter(k => k >= minKey && k <= maxKey);
    return {
      minKey,
      maxKey,
      matches,
      timeComplexity: 'O(log N + K)',
      strategy: 'B+ Tree Leaf-Pointer Linked List Traversal'
    };
  }
}

export class HashIndexSimulator {
  constructor(bucketCount = 8) {
    this.bucketCount = bucketCount;
    this.buckets = Array.from({ length: bucketCount }, () => []);
  }

  hash(key) {
    return Math.abs(key) % this.bucketCount;
  }

  insert(key, value = 'row_ptr') {
    const bucketIdx = this.hash(key);
    this.buckets[bucketIdx].push({ key, value });
    return { key, bucketIdx };
  }

  search(key) {
    const bucketIdx = this.hash(key);
    const bucket = this.buckets[bucketIdx];
    const item = bucket.find(e => e.key === key);
    return {
      key,
      found: !!item,
      bucketIdx,
      stepsTaken: 1,
      timeComplexity: 'O(1)',
      chainLength: bucket.length
    };
  }

  rangeSearch(_minKey, _maxKey) {
    return {
      supported: false,
      reason: 'Hash Index unterstützt keine Range Queries (BETWEEN / < / >). Full Table Scan erforderlich!',
      timeComplexity: 'O(N)'
    };
  }
}
