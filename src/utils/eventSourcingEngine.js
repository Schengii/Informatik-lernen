/**
 * Event-Sourcing & CQRS Engine
 * Simulates immutable append-only Event Stores, domain event streams,
 * event replay, and materialized Read Model projections.
 */

export class EventStoreSimulator {
  constructor() {
    this.events = []; // [{ eventId, aggregateId, type, payload, timestamp, version }]
    this.snapshots = {}; // aggregateId -> { version, state }
  }

  appendEvent(aggregateId, type, payload) {
    const aggregateEvents = this.getEvents(aggregateId);
    const version = aggregateEvents.length + 1;

    const event = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      aggregateId,
      type,
      payload,
      timestamp: new Date().toISOString(),
      version
    };

    this.events.push(event);
    return event;
  }

  getEvents(aggregateId) {
    return this.events.filter(e => e.aggregateId === aggregateId);
  }

  projectBankAccount(aggregateId) {
    const events = this.getEvents(aggregateId);

    const state = {
      accountId: aggregateId,
      owner: 'Unbekannt',
      balance: 0,
      status: 'UNINITIALIZED',
      transactionCount: 0,
      version: 0
    };

    for (const evt of events) {
      state.version = evt.version;
      switch (evt.type) {
        case 'ACCOUNT_OPENED':
          state.owner = evt.payload.owner || 'Azubi Dev';
          state.balance = evt.payload.initialDeposit || 0;
          state.status = 'ACTIVE';
          state.transactionCount++;
          break;
        case 'MONEY_DEPOSITED':
          state.balance += evt.payload.amount || 0;
          state.transactionCount++;
          break;
        case 'MONEY_WITHDRAWN':
          state.balance -= evt.payload.amount || 0;
          state.transactionCount++;
          break;
        case 'ACCOUNT_FROZEN':
          state.status = 'FROZEN';
          break;
        default:
          break;
      }
    }

    return state;
  }

  createSnapshot(aggregateId) {
    const currentState = this.projectBankAccount(aggregateId);
    this.snapshots[aggregateId] = {
      version: currentState.version,
      state: { ...currentState },
      createdAt: new Date().toISOString()
    };
    return this.snapshots[aggregateId];
  }
}
