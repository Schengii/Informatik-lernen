import { describe, it, expect } from 'vitest';
import { PostgresWalSimulator } from './postgresWalEngine';

describe('PostgreSQL WAL & LSN Replication Engine', () => {
  it('formats LSN correctly and advances on transaction commit', () => {
    const wal = new PostgresWalSimulator('async');
    const res = wal.commitTransaction('INSERT INTO accounts VALUES (10, 500)');

    expect(res.record.lsn).toMatch(/^0\/[0-9A-F]+/);
    expect(wal.walRecords.length).toBe(1);
    expect(res.replicationLagBytes).toBeGreaterThan(0);
  });

  it('guarantees 0 lag bytes in synchronous replication mode', () => {
    const wal = new PostgresWalSimulator('sync');
    const res = wal.commitTransaction('UPDATE accounts SET balance = 1000');

    expect(res.primaryLsn).toBe(res.standbyLsn);
    expect(res.replicationLagBytes).toBe(0);
  });

  it('sets REDO point on manual checkpoint trigger', () => {
    const wal = new PostgresWalSimulator('async');
    wal.commitTransaction();
    const chk = wal.triggerCheckpoint();

    expect(chk.checkpointLsn).toBe(wal.flushedLsn);
    expect(chk.message).toContain('Checkpoint erfolgreich');
  });
});
