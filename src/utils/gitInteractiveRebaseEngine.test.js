import { describe, it, expect } from 'vitest';
import {
  executeRebase,
  INITIAL_REBASE_COMMITS,
  generateRebaseTodoFile
} from './gitInteractiveRebaseEngine';

describe('Git Interactive Rebase Engine', () => {
  it('successfully applies squashes, fixups, and drops', () => {
    const res = executeRebase(INITIAL_REBASE_COMMITS);
    expect(res.success).toBe(true);
    expect(res.finalCount).toBeLessThan(res.initialCount);
    expect(res.commits.some(c => c.message.includes('wip: add unit tests'))).toBe(true);
  });

  it('rejects squash on the very first commit without a parent', () => {
    const invalidCommits = [
      { id: 'c1', hash: 'a1b2c3d', command: 'squash', message: 'invalid initial squash' }
    ];

    const res = executeRebase(invalidCommits);
    expect(res.success).toBe(false);
    expect(res.error).toContain('nicht \'squash\' sein');
  });

  it('generates standard git-rebase-todo formatted text', () => {
    const todo = generateRebaseTodoFile(INITIAL_REBASE_COMMITS);
    expect(todo).toContain('pick    a1b2c3d');
    expect(todo).toContain('drop    5a6b7c8');
  });
});
