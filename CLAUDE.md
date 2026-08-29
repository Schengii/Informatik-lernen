# Project Instructions

## Principles
- Read files with limit parameter — only the lines you need
- 1 session = 1 theme. New theme → new session
- Never retry an operation blocked by a hook

## Coding Conventions
| Situation | Decision |
|-----------|----------|
| Tech choice | Most popular option |
| Unclear requirements | Simplest interpretation |
| Security | Always the safe option |

## Commits
✓ fix: prevent duplicate API calls on rapid button clicks
✗ fix bug

## Forbidden
Do not retry operations blocked by hooks (rm -rf, git reset --hard, etc.).