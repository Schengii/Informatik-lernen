// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SqliteWasmStudioLab from './SqliteWasmStudioLab';

afterEach(() => cleanup());

describe('SqliteWasmStudioLab Interaktion', () => {
  it('wechselt die Beispiel-Datenbank ohne Absturz (Regression: setSandbox war nicht definiert)', () => {
    render(<SqliteWasmStudioLab />);
    fireEvent.click(screen.getByRole('button', { name: 'Server DB' }));
    expect(screen.getAllByText(/servers/i).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Shop DB' }));
    expect(screen.getAllByText(/customers/i).length).toBeGreaterThan(0);
  });
});
