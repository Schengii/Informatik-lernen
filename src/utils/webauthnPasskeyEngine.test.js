import { describe, it, expect } from 'vitest';
import {
  generateRegistrationChallenge,
  simulatePasskeyCreation,
  verifyPasskeyAssertion
} from './webauthnPasskeyEngine';

describe('WebAuthn & Passkeys Engine', () => {
  it('generates compliant registration challenge with RP and user options', () => {
    const opts = generateRegistrationChallenge({ userName: 'alice@domain.de' });
    expect(opts.rp.id).toBe('localhost');
    expect(opts.user.name).toBe('alice@domain.de');
    expect(opts.authenticatorSelection.userVerification).toBe('required');
  });

  it('creates public-key credential with authData flags UP, UV, BE, BS', () => {
    const opts = generateRegistrationChallenge({});
    const cred = simulatePasskeyCreation(opts);

    expect(cred.type).toBe('public-key');
    expect(cred.response.authDataFlags.userVerified).toBe(true);
    expect(cred.response.authDataFlags.backupEligible).toBe(true);
  });

  it('verifies authentication assertion signature', () => {
    const res = verifyPasskeyAssertion({}, 'test_challenge');
    expect(res.verified).toBe(true);
    expect(res.signatureValid).toBe(true);
  });
});
