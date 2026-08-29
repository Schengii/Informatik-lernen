import { describe, it, expect } from 'vitest';
import {
  createInitialVFS,
  createInitialServices,
  resolvePath,
  executeVfsPipeline,
  LINUX_CHALLENGES
} from './linuxVfsEngine';

describe('Linux VFS & POSIX Engine', () => {
  function getInitialState() {
    return {
      vfs: createInitialVFS(),
      services: createInitialServices(),
      cwd: '/home/dev',
      currentUser: 'dev',
      env: { USER: 'dev', HOME: '/home/dev', SHELL: '/bin/bash' },
      history: []
    };
  }

  it('resolves relative and absolute paths correctly', () => {
    expect(resolvePath('/home/dev', 'projects')).toBe('/home/dev/projects');
    expect(resolvePath('/home/dev', '..')).toBe('/home');
    expect(resolvePath('/home/dev', '/etc/systemd')).toBe('/etc/systemd');
    expect(resolvePath('/home/dev/projects', '../../../var/log')).toBe('/var/log');
  });

  it('executes pwd and cd commands', () => {
    let state = getInitialState();
    let res = executeVfsPipeline('pwd', state);
    expect(res.output).toBe('/home/dev');

    res = executeVfsPipeline('cd /etc', res.state);
    expect(res.state.cwd).toBe('/etc');

    res = executeVfsPipeline('pwd', res.state);
    expect(res.output).toBe('/etc');
  });

  it('executes cat, grep, wc with pipes and redirections', () => {
    let state = getInitialState();
    // Test cat + grep with pipe
    let res = executeVfsPipeline('cat /var/log/syslog | grep error', state);
    expect(res.output).toContain('Connection refused');

    // Test wc -l with pipe
    res = executeVfsPipeline('cat /var/log/syslog | grep error | wc -l', state);
    expect(res.output.trim()).toBe('2');

    // Test redirection
    res = executeVfsPipeline('echo "Suspicious Host 45.33.32.156" > /home/dev/alert.txt', state);
    expect(res.state.vfs['/home/dev/alert.txt']).toBeDefined();
    expect(res.state.vfs['/home/dev/alert.txt'].content).toBe('Suspicious Host 45.33.32.156');
  });

  it('manages systemd services with systemctl status and restart', () => {
    let state = getInitialState();
    expect(state.services['api.service'].status).toBe('failed');

    let res = executeVfsPipeline('systemctl status api.service', state);
    expect(res.output).toContain('failed');

    res = executeVfsPipeline('systemctl restart api.service', state);
    expect(res.state.services['api.service'].status).toBe('active');
    expect(res.output).toContain('[ OK ] Started');
  });

  it('handles chmod and file permissions correctly', () => {
    let state = getInitialState();
    let res = executeVfsPipeline('chmod 600 /home/dev/.ssh/id_rsa', state);
    expect(res.state.vfs['/home/dev/.ssh/id_rsa'].mode).toBe('rw-------');
  });

  it('validates challenge requirements correctly', () => {
    const state = getInitialState();
    const challenge1 = LINUX_CHALLENGES[0];
    expect(challenge1.checkPassed(state.vfs, state.services)).toBe(false);

    const restarted = executeVfsPipeline('systemctl restart api.service', state);
    expect(challenge1.checkPassed(restarted.state.vfs, restarted.state.services)).toBe(true);
  });
});
