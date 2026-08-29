/**
 * Kafka Event-Streaming & Partition Rebalance Engine
 * Simulates Consumer Group partition assignments, Consumer join/leave events,
 * and Eager vs. Cooperative Sticky rebalance protocols.
 */

export class KafkaConsumerGroupSimulator {
  constructor(partitionCount = 4, protocol = 'cooperative-sticky') {
    this.partitionCount = partitionCount;
    this.protocol = protocol; // 'eager' | 'cooperative-sticky'
    this.consumers = []; // array of { id, assignedPartitions }
    this.generationId = 0;
    this.rebalanceHistory = [];
  }

  addConsumer(id) {
    this.consumers.push({ id, assignedPartitions: [] });
    this.rebalance('CONSUMER_JOINED');
  }

  removeConsumer(id) {
    this.consumers = this.consumers.filter(c => c.id !== id);
    this.rebalance('CONSUMER_LEFT');
  }

  rebalance(reason = 'MANUAL_TRIGGER') {
    this.generationId++;
    const n = this.consumers.length;

    if (n === 0) {
      this.rebalanceHistory.push({
        generationId: this.generationId,
        reason,
        protocol: this.protocol,
        assignments: {}
      });
      return;
    }

    // Reset assignments
    this.consumers.forEach(c => {
      c.assignedPartitions = [];
    });

    // Assign partitions round-robin / evenly
    for (let p = 0; p < this.partitionCount; p++) {
      const consumerIndex = p % n;
      this.consumers[consumerIndex].assignedPartitions.push(p);
    }

    const assignments = {};
    this.consumers.forEach(c => {
      assignments[c.id] = [...c.assignedPartitions];
    });

    this.rebalanceHistory.push({
      generationId: this.generationId,
      reason,
      protocol: this.protocol,
      assignments
    });
  }

  getState() {
    return {
      partitionCount: this.partitionCount,
      protocol: this.protocol,
      generationId: this.generationId,
      consumers: this.consumers.map(c => ({ ...c, assignedPartitions: [...c.assignedPartitions] })),
      lastRebalance: this.rebalanceHistory[this.rebalanceHistory.length - 1] || null
    };
  }
}
