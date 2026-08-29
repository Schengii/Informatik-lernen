import { describe, it, expect } from 'vitest';
import { RedisCacheSimulator, SimpleBloomFilter } from './redisEvictionEngine';

describe('Redis Eviction & Bloom Filter Engine', () => {
  it('blocks unknown keys using Bloom Filter (cache penetration protection)', () => {
    const bloom = new SimpleBloomFilter(32);
    bloom.add('user:101');

    expect(bloom.mightContain('user:101')).toBe(true);
    expect(bloom.mightContain('unknown:999')).toBe(false);
  });

  it('evicts the least recently used key when full in LRU policy', () => {
    const redis = new RedisCacheSimulator(2, 'allkeys-lru');
    redis.set('key1', 'val1');
    redis.set('key2', 'val2');

    // Access key1 so key2 becomes least recently used
    redis.get('key1');

    // Insert key3 -> should evict key2
    const res = redis.set('key3', 'val3');
    expect(res.evicted).toBe('key2');
    expect(redis.get('key2').found).toBe(false);
    expect(redis.get('key1').found).toBe(true);
  });

  it('evicts least frequently used key in LFU policy', () => {
    const redis = new RedisCacheSimulator(2, 'allkeys-lfu');
    redis.set('key1', 'val1');
    redis.set('key2', 'val2');

    // Access key1 multiple times to increase frequency
    redis.get('key1');
    redis.get('key1');

    const res = redis.set('key3', 'val3');
    expect(res.evicted).toBe('key2');
  });
});
