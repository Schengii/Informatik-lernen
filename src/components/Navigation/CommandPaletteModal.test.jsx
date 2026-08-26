// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import CommandPaletteModal from './CommandPaletteModal';

// Regression test: the `staticActions` list is built on every render (even while
// closed) and used to reference icon components like `Lock`/`Radio` directly by
// name without importing them. That's a ReferenceError that oxlint's default
// rules don't catch (it only flags undefined JSX tags, not plain identifiers
// used as object property values) — so it silently crashed the whole app,
// since ModalContainer always mounts this component regardless of `isOpen`.
describe('CommandPaletteModal', () => {
  it('mounts without throwing while closed', () => {
    expect(() =>
      render(
        <CommandPaletteModal isOpen={false} onClose={vi.fn()} onNavigate={vi.fn()} onOpenModal={vi.fn()} />
      )
    ).not.toThrow();
  });

  it('mounts without throwing while open', () => {
    expect(() =>
      render(
        <CommandPaletteModal isOpen={true} onClose={vi.fn()} onNavigate={vi.fn()} onOpenModal={vi.fn()} />
      )
    ).not.toThrow();
  });
});
