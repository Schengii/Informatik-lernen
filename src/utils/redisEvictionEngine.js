/**
 * Redis Cache-Eviction & Bloom Filter Engine
 * Simulates Redis memory management policies (allkeys-lru, volatile-lru, allkeys-lfu, volatile-ttl)
 * and Bloom filter probabilistic cache penetration defense.
 */

export class SimpleBloomFilter {
  constructor(size = 32) {
    this.size = size;
    this.bits = new Array(size).fill(0);
  }

  hash1(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.size;
  }

  hash2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.size;
  }

  add(key) {
    this.bits[this.hash1(key)] = 1;
    this.bits[this.hash2(key)] = 1;
  }

  mightContain(key) {
    return this.bits[this.hash1(key)] === 1 && this.bits[this.hash2(key)] === 1;
  }
}

export class RedisCacheSimulator {
  constructor(maxSlots = 5, policy = 'allkeys-lru') {
    this.maxSlots = maxSlots;
    this.policy = policy; // 'allkeys-lru' | 'allkeys-lfu' | 'volatile-ttl'
    this.cache = new Map(); // key -> { value, ttl, lastAccessed, freq }
    this.timeCounter = 0;
    this.bloom = new SimpleBloomFilter(32);
    this.hits = 0;
    this.misses = 0;
  }

  set(key, value, ttl = 60) {
    this.timeCounter++;
    this.bloom.add(key);

    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      entry.value = value;
      entry.ttl = ttl;
      entry.lastAccessed = this.timeCounter;
      entry.freq++;
      return { evicted: null };
    }

    let evicted = null;
    if (this.cache.size >= this.maxSlots) {
      evicted = this.evict();
    }

    this.cache.set(key, {
      key,
      value,
      ttl,
      lastAccessed: this.timeCounter,
      freq: 1
    });

    return { evicted };
  }

  get(key) {
    this.timeCounter++;
    if (!this.bloom.mightContain(key)) {
      this.misses++;
      return { found: false, penetrationBlocked: true, value: null };
    }

    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      entry.lastAccessed = this.timeCounter;
      entry.freq++;
      this.hits++;
      return { found: true, penetrationBlocked: false, value: entry.value };
    }

    this.misses++;
    return { found: false, penetrationBlocked: false, value: null };
  }

  evict() {
    let candidateKey = null;

    if (this.policy === 'allkeys-lfu') {
      let minFreq = Infinity;
      for (const [k, v] of this.cache.entries()) {
        if (v.freq < minFreq) {
          minFreq = v.freq;
          candidateKey = k;
        }
      }
    } else if (this.policy === 'volatile-ttl') {
      let minTtl = Infinity;
      for (const [k, v] of this.cache.entries()) {
        if (v.ttl < minTtl) {
          minTtl = v.ttl;
          candidateKey = k;
        }
      }
    } else {
      // Default: allkeys-lru
      let minAccessed = Infinity;
      for (const [k, v] of this.cache.entries()) {
        if (v.lastAccessed < minAccessed) {
          minAccessed = v.lastAccessed;
          candidateKey = k;
        }
      }
    }

    if (candidateKey) {
      this.cache.delete(candidateKey);
      return candidateKey;
    }
    return null;
  }

  getEntries() {
    return Array.from(this.cache.values());
  }

  getStats() {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRatio: total > 0 ? Math.round((this.hits / total) * 100) : 0,
      occupiedSlots: this.cache.size,
      maxSlots: this.maxSlots
    };
  }
}
