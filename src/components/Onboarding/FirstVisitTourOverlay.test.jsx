// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstVisitTourOverlay from './FirstVisitTourOverlay';

describe('FirstVisitTourOverlay', () => {
  it('mounts without throwing and shows the first step', () => {
    render(<FirstVisitTourOverlay onComplete={vi.fn()} />);
    expect(screen.getByText('Schnellsuche mit Strg + K')).toBeTruthy();
  });

  it('advances through all steps and calls onComplete on the last "Los geht\'s" click', () => {
    const onComplete = vi.fn();
    render(<FirstVisitTourOverlay onComplete={onComplete} />);

    fireEvent.click(screen.getByText('Weiter'));
    expect(screen.getByText('Über 100 Labs & Simulatoren')).toBeTruthy();

    fireEvent.click(screen.getByText('Weiter'));
    expect(screen.getByText('Adaptive Lernempfehlungen')).toBeTruthy();
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Los geht's"));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onComplete immediately when skipped', () => {
    const onComplete = vi.fn();
    render(<FirstVisitTourOverlay onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Überspringen'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
