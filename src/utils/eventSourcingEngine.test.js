import { describe, it, expect } from 'vitest';
import { EventStoreSimulator } from './eventSourcingEngine';

describe('Event Sourcing Engine', () => {
  it('appends immutable events and maintains monotonic sequence version', () => {
    const store = new EventStoreSimulator();
    const e1 = store.appendEvent('acc_100', 'ACCOUNT_OPENED', { owner: 'Alice', initialDeposit: 500 });
    const e2 = store.appendEvent('acc_100', 'MONEY_DEPOSITED', { amount: 200 });

    expect(e1.version).toBe(1);
    expect(e2.version).toBe(2);
    expect(store.getEvents('acc_100').length).toBe(2);
  });

  it('reconstructs aggregate state correctly via event stream replay', () => {
    const store = new EventStoreSimulator();
    store.appendEvent('acc_200', 'ACCOUNT_OPENED', { owner: 'Bob', initialDeposit: 1000 });
    store.appendEvent('acc_200', 'MONEY_WITHDRAWN', { amount: 350 });
    store.appendEvent('acc_200', 'MONEY_DEPOSITED', { amount: 150 });

    const projection = store.projectBankAccount('acc_200');
    expect(projection.owner).toBe('Bob');
    expect(projection.balance).toBe(800); // 1000 - 350 + 150
    expect(projection.transactionCount).toBe(3);
    expect(projection.status).toBe('ACTIVE');
  });

  it('creates state snapshots for high-performance state hydration', () => {
    const store = new EventStoreSimulator();
    store.appendEvent('acc_300', 'ACCOUNT_OPENED', { owner: 'Charlie', initialDeposit: 250 });
    const snap = store.createSnapshot('acc_300');

    expect(snap.version).toBe(1);
    expect(snap.state.balance).toBe(250);
  });
});
