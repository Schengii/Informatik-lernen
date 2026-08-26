// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CommandPaletteModal from './CommandPaletteModal';

// Cleanup between renders is handled globally by vitest.setup.js.

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

  // Regression test for the search-scope fix: previously the search only matched a
  // hand-picked `staticActions` list by title, so a lab not curated there (like
  // `vector_search`) was unreachable via a term that only appears in its LAB_REGISTRY
  // description/tags, never in its title.
  it('finds a non-curated lab by a term from its LAB_REGISTRY description, not just its title', () => {
    render(<CommandPaletteModal isOpen={true} onClose={vi.fn()} onNavigate={vi.fn()} onOpenModal={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Suche/i);
    fireEvent.change(input, { target: { value: 'Kosinus' } });
    expect(screen.getByText(/Local RAG Vector Database & Embedding Explorer/)).toBeTruthy();
  });
});
