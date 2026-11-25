// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LearningPathWidget from './LearningPathWidget';
import { useStore } from '../../store/useStore';

beforeEach(() =>
  useStore.setState((s) => ({
    userState: { ...s.userState, careerFilter: 'all', pathSnoozed: {}, placementResult: null, mistakeJournal: {}, labProgress: {} }
  }))
);
afterEach(() => cleanup());

describe('LearningPathWidget', () => {
  it('zeigt drei Empfehlungen und den Hinweis auf den Einstufungstest', () => {
    render(<LearningPathWidget onSelectLab={() => {}} />);
    expect(screen.getByRole('heading', { name: /Empfohlen für dich/i })).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText(/Einstufungstest/i)).toBeTruthy();
  });

  it('öffnet das gewählte Lab', () => {
    const onSelectLab = vi.fn();
    render(<LearningPathWidget onSelectLab={onSelectLab} />);
    const first = screen.getAllByRole('listitem')[0].querySelector('button');
    fireEvent.click(first);
    expect(onSelectLab).toHaveBeenCalledTimes(1);
    expect(typeof onSelectLab.mock.calls[0][0]).toBe('string');
  });

  it('blendet ein Lab bis morgen aus und merkt es im Spielstand', () => {
    render(<LearningPathWidget onSelectLab={() => {}} />);
    const before = screen.getAllByRole('listitem')[0].querySelector('button').textContent;
    fireEvent.click(screen.getAllByRole('button', { name: /bis morgen ausblenden/i })[0]);
    expect(Object.keys(useStore.getState().userState.pathSnoozed)).toHaveLength(1);
    expect(screen.getAllByRole('listitem')[0].querySelector('button').textContent).not.toBe(before);
  });

  it('speichert den Berufsfilter im Spielstand', () => {
    render(<LearningPathWidget onSelectLab={() => {}} />);
    fireEvent.change(screen.getByLabelText('Beruf'), { target: { value: 'wiso' } });
    expect(useStore.getState().userState.careerFilter).toBe('wiso');
  });
});
