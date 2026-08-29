import { describe, it, expect } from 'vitest';
import { KafkaConsumerGroupSimulator } from './kafkaRebalanceEngine';

describe('Kafka Rebalance Engine', () => {
  it('distributes partitions evenly across active consumers', () => {
    const sim = new KafkaConsumerGroupSimulator(4, 'cooperative-sticky');
    sim.addConsumer('consumer-1');
    sim.addConsumer('consumer-2');

    const state = sim.getState();
    expect(state.consumers.length).toBe(2);
    expect(state.consumers[0].assignedPartitions).toEqual([0, 2]);
    expect(state.consumers[1].assignedPartitions).toEqual([1, 3]);
  });

  it('handles consumer failure and reassigns orphaned partitions', () => {
    const sim = new KafkaConsumerGroupSimulator(4, 'cooperative-sticky');
    sim.addConsumer('c1');
    sim.addConsumer('c2');
    sim.removeConsumer('c1');

    const state = sim.getState();
    expect(state.consumers.length).toBe(1);
    expect(state.consumers[0].assignedPartitions).toEqual([0, 1, 2, 3]);
  });
});
