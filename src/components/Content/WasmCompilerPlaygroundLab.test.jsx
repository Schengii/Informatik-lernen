// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import WasmCompilerPlaygroundLab from './WasmCompilerPlaygroundLab';

// Regression test: the "isCompiling" ternary rendered `<RefreshCw />` without
// importing it from lucide-react. Since it only appears inside the `true`
// branch of a ternary, oxlint's static analysis catches it (unlike the
// `icon: X` object-literal bugs found in other files), but the crash still
// only happens once a user actually clicks "compile" — mounting alone looked fine.
describe('WasmCompilerPlaygroundLab', () => {
  it('does not throw when the compile button is clicked (isCompiling branch)', () => {
    render(<WasmCompilerPlaygroundLab />);
    const compileButton = screen.getByText('Zu WASM kompilieren');
    expect(() => fireEvent.click(compileButton)).not.toThrow();
  });
});
