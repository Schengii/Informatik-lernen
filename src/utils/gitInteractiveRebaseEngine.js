/**
 * Git Interactive Rebase Engine (git rebase -i)
 * Simulates commit history manipulation, reordering, squashing, fixups, and drops.
 */

export const INITIAL_REBASE_COMMITS = [
  { id: 'c1', hash: 'a1b2c3d', command: 'pick', message: 'feat: add user authentication endpoint', author: 'Dev <dev@company.de>' },
  { id: 'c2', hash: 'e4f5a6b', command: 'reword', message: 'fix typo in auth token validator', author: 'Dev <dev@company.de>' },
  { id: 'c3', hash: '7c8d9e0', command: 'squash', message: 'wip: add unit tests for auth', author: 'Dev <dev@company.de>' },
  { id: 'c4', hash: '1f2e3d4', command: 'fixup', message: 'fix linter error in test file', author: 'Dev <dev@company.de>' },
  { id: 'c5', hash: '5a6b7c8', command: 'drop', message: 'temp: console.log debug statements', author: 'Dev <dev@company.de>' }
];

export const REBASE_COMMANDS = [
  { id: 'pick', label: 'pick (p)', desc: 'Commit unverändert übernehmen' },
  { id: 'reword', label: 'reword (r)', desc: 'Commit übernehmen, aber Commit-Message anpassen' },
  { id: 'edit', label: 'edit (e)', desc: 'Commit übernehmen, aber für Änderungen anhalten' },
  { id: 'squash', label: 'squash (s)', desc: 'Mit vorherigem Commit verschmelzen & Messages vereinen' },
  { id: 'fixup', label: 'fixup (f)', desc: 'Mit vorherigem Commit verschmelzen & Message verwerfen' },
  { id: 'drop', label: 'drop (d)', desc: 'Commit komplett aus dem Branch entfernen' }
];

/**
 * Validates and executes a git interactive rebase sequence
 */
export function executeRebase(commits) {
  if (!commits || commits.length === 0) {
    return { success: false, error: 'Keine Commits für Rebase vorhanden.' };
  }

  // First commit cannot be squash or fixup
  const firstActive = commits.find(c => c.command !== 'drop');
  if (firstActive && (firstActive.command === 'squash' || firstActive.command === 'fixup')) {
    return {
      success: false,
      error: `Der erste Commit (${firstActive.hash}) kann nicht '${firstActive.command}' sein, da kein Vorgänger-Commit existiert.`
    };
  }

  const resultCommits = [];
  let currentTarget = null;

  for (let i = 0; i < commits.length; i++) {
    const c = commits[i];

    if (c.command === 'drop') {
      continue; // Dropped
    }

    if (c.command === 'squash') {
      if (currentTarget) {
        currentTarget.message += `\n* ${c.message}`;
        currentTarget.squashedCount = (currentTarget.squashedCount || 0) + 1;
      }
    } else if (c.command === 'fixup') {
      if (currentTarget) {
        currentTarget.squashedCount = (currentTarget.squashedCount || 0) + 1;
      }
    } else {
      // pick / reword / edit
      currentTarget = {
        id: `reb_${c.id}`,
        hash: c.hash,
        command: c.command,
        message: c.message,
        author: c.author,
        squashedCount: 0
      };
      resultCommits.push(currentTarget);
    }
  }

  return {
    success: true,
    initialCount: commits.length,
    finalCount: resultCommits.length,
    commits: resultCommits,
    cliPreview: generateRebaseTodoFile(commits)
  };
}

export function generateRebaseTodoFile(commits) {
  return commits
    .map(c => `${c.command.padEnd(7, ' ')} ${c.hash} ${c.message}`)
    .join('\n');
}
