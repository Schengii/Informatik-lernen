// In-Memory Virtual File System (VFS) & POSIX Command Interpreter Engine
// Supports hierarchical file trees, pipes, redirections, permission modes, services, and challenges.

export function createInitialVFS() {
  return {
    '/': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/home': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/home/dev': { type: 'dir', mode: 'rwxr-xr-x', owner: 'dev', size: 4096, modified: '2026-08-29 08:00' },
    '/home/dev/projects': { type: 'dir', mode: 'rwxr-xr-x', owner: 'dev', size: 4096, modified: '2026-08-29 09:15' },
    '/home/dev/projects/server.js': {
      type: 'file',
      mode: 'rw-r--r--',
      owner: 'dev',
      size: 482,
      modified: '2026-08-29 09:30',
      content: `const http = require('http');\nconst port = process.env.PORT || 3000;\nconst server = http.createServer((req, res) => {\n  if (req.url === '/health') return res.end(JSON.stringify({ status: 'UP' }));\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello from Microservice!');\n});\nserver.listen(port);`
    },
    '/home/dev/notes.txt': {
      type: 'file',
      mode: 'rw-r--r--',
      owner: 'dev',
      size: 154,
      modified: '2026-08-29 08:45',
      content: `Wichtige IHK Prüfungstermine:\n- AP1: 01. März 2026\n- AP2: 05. Mai 2026\n- Projektarbeit Abgabe: 15. Juni 2026\nServer-Notiz: api.service crasht bei OOM!`
    },
    '/home/dev/.ssh': { type: 'dir', mode: 'rwxr-xr-x', owner: 'dev', size: 4096, modified: '2026-08-29 08:00' },
    '/home/dev/.ssh/id_rsa': {
      type: 'file',
      mode: 'rwxrwxrwx', // Unsicher! Challenge 2 verlangt chmod 600
      owner: 'dev',
      size: 1675,
      modified: '2026-08-29 08:00',
      content: `-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAYEAv67h82a9...[DEMO_KEY]...k8a1\n-----END OPENSSH PRIVATE KEY-----`
    },
    '/etc': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/etc/passwd': {
      type: 'file',
      mode: 'rw-r--r--',
      owner: 'root',
      size: 340,
      modified: '2026-08-29 08:00',
      content: `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\ndev:x:1000:1000:Dev User,,,:/home/dev:/bin/bash\nnginx:x:1001:1001:Nginx Web Server:/var/www:/usr/sbin/nologin`
    },
    '/etc/systemd': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/etc/systemd/system': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/etc/systemd/system/api.service': {
      type: 'file',
      mode: 'rw-r--r--',
      owner: 'root',
      size: 210,
      modified: '2026-08-29 08:00',
      content: `[Unit]\nDescription=NodeJS Backend API Daemon\nAfter=network.target\n\n[Service]\nExecStart=/usr/bin/node /home/dev/projects/server.js\nRestart=always\nUser=dev\n\n[Install]\nWantedBy=multi-user.target`
    },
    '/var': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/var/log': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/var/log/syslog': {
      type: 'file',
      mode: 'rw-r-----',
      owner: 'root',
      size: 1420,
      modified: '2026-08-29 10:14',
      content: `Aug 29 10:00:01 node-01 systemd[1]: Starting Daily apt upgrade and clean activities...\nAug 29 10:05:12 node-01 kernel: [ 4821.109] Out of memory: Kill process 2941 (node) score 852 or sacrifice child\nAug 29 10:05:13 node-01 systemd[1]: api.service: Main process exited, code=killed, status=9/SIGKILL\nAug 29 10:05:13 node-01 systemd[1]: api.service: Failed with result 'oom-killer'.\nAug 29 10:06:00 node-01 sshd[3102]: Accepted publickey for dev from 192.168.1.45 port 54122 ssh2\nAug 29 10:10:44 node-01 nginx[1204]: [error] 1204#0: *44 connect() failed (111: Connection refused) while connecting to upstream http://127.0.0.1:3000\nAug 29 10:12:00 node-01 nginx[1204]: [error] 1204#0: *48 connect() failed (111: Connection refused) while connecting to upstream http://127.0.0.1:3000`
    },
    '/var/log/crash.dump': {
      type: 'file',
      mode: 'rw-rw-r--',
      owner: 'root',
      size: 948200, // Riesige temporäre Datei (Challenge 3)
      modified: '2026-08-29 07:30',
      content: 'CORE_DUMP_CHUNK_0x8F9401...[UNCOMPRESSED_MEMORY_DUMP]...END'
    },
    '/var/log/nginx': { type: 'dir', mode: 'rwxr-xr-x', owner: 'root', size: 4096, modified: '2026-08-29 08:00' },
    '/var/log/nginx/access.log': {
      type: 'file',
      mode: 'rw-r--r--',
      owner: 'root',
      size: 890,
      modified: '2026-08-29 10:15',
      content: `192.168.1.45 - - [29/Aug/2026:10:06:01 +0200] "GET /api/v1/users HTTP/1.1" 200 452\n10.0.4.120 - - [29/Aug/2026:10:08:14 +0200] "POST /api/v1/auth/login HTTP/1.1" 200 128\n45.33.32.156 - - [29/Aug/2026:10:10:44 +0200] "GET /wp-login.php HTTP/1.1" 404 162\n45.33.32.156 - - [29/Aug/2026:10:10:45 +0200] "GET /administrator HTTP/1.1" 404 162\n192.168.1.45 - - [29/Aug/2026:10:12:00 +0200] "GET /api/v1/metrics HTTP/1.1" 502 182\n45.33.32.156 - - [29/Aug/2026:10:12:05 +0200] "GET /.env HTTP/1.1" 404 162`
    },
    '/tmp': { type: 'dir', mode: 'rwxrwxrwt', owner: 'root', size: 4096, modified: '2026-08-29 08:00' }
  };
}

export function createInitialServices() {
  return {
    'api.service': { name: 'api.service', status: 'failed', description: 'NodeJS Backend API Daemon', pid: null },
    'nginx.service': { name: 'nginx.service', status: 'active', description: 'Nginx High Performance Web Server', pid: 1204 },
    'sshd.service': { name: 'sshd.service', status: 'active', description: 'OpenSSH Server Daemon', pid: 852 }
  };
}

export const LINUX_CHALLENGES = [
  {
    id: 'challenge_1_502_fix',
    title: '1. Notfall: Webserver 502 Bad Gateway beheben',
    scenario: 'Nutzer melden einen 502 Bad Gateway Fehler. Prüfe die Logs in /var/log/syslog und starte den abgestürzten Backend-Dienst (api.service) neu.',
    hints: ['Nutze "cat /var/log/syslog | grep error"', 'Überprüfe "systemctl status api.service"', 'Starte den Dienst mit "systemctl restart api.service"'],
    rewardXP: 100,
    checkPassed: (vfs, services) => {
      return services['api.service']?.status === 'active';
    }
  },
  {
    id: 'challenge_2_ssh_permissions',
    title: '2. Security Audit: SSH Private Key Berechtigungen härten',
    scenario: 'Der private SSH-Schlüssel unter /home/dev/.ssh/id_rsa hat unsichere 777-Berechtigungen (jeder darf lesen/schreiben). Setze die Rechte auf 600 (rw-------).',
    hints: ['Prüfe Berechtigungen mit "ls -la /home/dev/.ssh"', 'Verwende "chmod 600 /home/dev/.ssh/id_rsa"'],
    rewardXP: 100,
    checkPassed: (vfs) => {
      return vfs['/home/dev/.ssh/id_rsa']?.mode === 'rw-------' || vfs['/home/dev/.ssh/id_rsa']?.mode === '600';
    }
  },
  {
    id: 'challenge_3_disk_cleanup',
    title: '3. Speicherplatz-Notfall: Crash-Dump bereinigen',
    scenario: 'Das Dateisystem ist fast voll. Finde die große Dump-Datei in /var/log/ und lösche /var/log/crash.dump.',
    hints: ['Finde Dateien mit "find /var/log -name *.dump"', 'Lösche die Datei mit "rm /var/log/crash.dump"'],
    rewardXP: 100,
    checkPassed: (vfs) => {
      return !vfs['/var/log/crash.dump'];
    }
  },
  {
    id: 'challenge_4_forensic_grep',
    title: '4. Log-Forensik: Verdächtige Zugriffe filtern',
    scenario: 'Finde alle Anfragen der Angreifer-IP 45.33.32.156 aus /var/log/nginx/access.log und speichere sie in /home/dev/suspicious.txt.',
    hints: ['Nutze "cat /var/log/nginx/access.log | grep 45.33.32.156 > /home/dev/suspicious.txt"'],
    rewardXP: 150,
    checkPassed: (vfs) => {
      const file = vfs['/home/dev/suspicious.txt'];
      return file && file.content.includes('45.33.32.156') && file.content.includes('wp-login.php');
    }
  }
];

export function resolvePath(currentDir, targetPath) {
  if (!targetPath || targetPath === '.') return currentDir;
  let normalized = targetPath.startsWith('/') ? targetPath : `${currentDir === '/' ? '' : currentDir}/${targetPath}`;
  
  // Resolve . and ..
  const parts = normalized.split('/').filter(Boolean);
  const stack = [];
  for (const p of parts) {
    if (p === '.') continue;
    if (p === '..') {
      stack.pop();
    } else {
      stack.push(p);
    }
  }
  return '/' + stack.join('/');
}

export function executeVfsPipeline(rawInput, state) {
  const input = rawInput.trim();
  if (!input) return { state, output: '' };

  // Handle history / clear
  if (input === 'clear') {
    return { state: { ...state, history: [...state.history, input] }, output: '__CLEAR__' };
  }

  // Handle Pipe "|" or Redirection ">", ">>"
  if (input.includes('|')) {
    const pipelineSegments = input.split('|').map((s) => s.trim()).filter(Boolean);
    let pipedOutput = '';
    let currState = { ...state };

    for (let i = 0; i < pipelineSegments.length; i++) {
      const seg = pipelineSegments[i];
      const res = executeSingleCommand(seg, currState, pipedOutput);
      pipedOutput = res.output;
      currState = res.state;
    }
    return {
      state: { ...currState, history: [...currState.history, input] },
      output: pipedOutput
    };
  }

  // Handle Redirection ">" and ">>"
  const redirectMatch = input.match(/^(.*?)\s*(>>|>)\s*([^\s]+)$/);
  if (redirectMatch) {
    const [, cmdPart, op, targetFile] = redirectMatch;
    const res = executeSingleCommand(cmdPart.trim(), state, '');
    const resolved = resolvePath(state.cwd, targetFile);
    const isAppend = op === '>>';
    const newVfs = { ...res.state.vfs };
    const existing = newVfs[resolved];
    const newContent = (existing && isAppend) ? `${existing.content}\n${res.output}` : res.output;

    newVfs[resolved] = {
      type: 'file',
      mode: existing ? existing.mode : 'rw-r--r--',
      owner: state.currentUser,
      size: newContent.length,
      modified: '2026-08-29 11:00',
      content: newContent
    };

    return {
      state: { ...res.state, vfs: newVfs, history: [...res.state.history, input] },
      output: ''
    };
  }

  const res = executeSingleCommand(input, state, '');
  return {
    state: { ...res.state, history: [...res.state.history, input] },
    output: res.output
  };
}

function executeSingleCommand(cmdStr, state, stdin = '') {
  const parts = cmdStr.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  if (parts.length === 0) return { state, output: '' };

  const cleanArgs = parts.map((p) => p.replace(/^"|"$/g, ''));
  const cmd = cleanArgs[0];
  const args = cleanArgs.slice(1);

  const { vfs, cwd, services, currentUser } = state;

  switch (cmd) {
    case 'pwd':
      return { state, output: cwd };

    case 'cd': {
      const target = args[0] || '/home/dev';
      const resolved = resolvePath(cwd, target);
      if (vfs[resolved] && vfs[resolved].type === 'dir') {
        return { state: { ...state, cwd: resolved }, output: '' };
      }
      return { state, output: `bash: cd: ${target}: No such file or directory` };
    }

    case 'ls': {
      const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const pathArg = args.find((a) => !a.startsWith('-')) || '.';
      const targetDir = resolvePath(cwd, pathArg);

      if (!vfs[targetDir]) {
        return { state, output: `ls: cannot access '${pathArg}': No such file or directory` };
      }
      if (vfs[targetDir].type === 'file') {
        return { state, output: pathArg };
      }

      // Collect children
      const prefix = targetDir === '/' ? '/' : `${targetDir}/`;
      const entries = Object.keys(vfs)
        .filter((k) => k !== targetDir && k.startsWith(prefix) && !k.slice(prefix.length).includes('/'))
        .map((k) => ({ name: k.slice(prefix.length), path: k, ...vfs[k] }));

      if (!showAll) {
        // filter dotfiles
        const visible = entries.filter((e) => !e.name.startsWith('.'));
        if (showLong) {
          return {
            state,
            output: `total ${visible.length * 4}\n` + visible.map((e) => `${e.type === 'dir' ? 'd' : '-'}${e.mode} 1 ${e.owner} ${e.owner} ${e.size} ${e.modified} ${e.name}`).join('\n')
          };
        }
        return { state, output: visible.map((e) => e.name).join('  ') };
      }

      if (showLong) {
        return {
          state,
          output: `total ${entries.length * 4}\n` + entries.map((e) => `${e.type === 'dir' ? 'd' : '-'}${e.mode} 1 ${e.owner} ${e.owner} ${e.size} ${e.modified} ${e.name}`).join('\n')
        };
      }
      return { state, output: ['.', '..', ...entries.map((e) => e.name)].join('  ') };
    }

    case 'cat': {
      if (args.length === 0 && stdin) {
        return { state, output: stdin };
      }
      const target = resolvePath(cwd, args[0]);
      if (!vfs[target]) {
        return { state, output: `cat: ${args[0]}: No such file or directory` };
      }
      if (vfs[target].type === 'dir') {
        return { state, output: `cat: ${args[0]}: Is a directory` };
      }
      return { state, output: vfs[target].content || '' };
    }

    case 'grep': {
      let isCaseInsensitive = false;
      let pattern = '';
      let fileArg = '';

      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-i') {
          isCaseInsensitive = true;
        } else if (!pattern) {
          pattern = args[i];
        } else {
          fileArg = args[i];
        }
      }

      let sourceText = stdin;
      if (fileArg) {
        const resolved = resolvePath(cwd, fileArg);
        if (!vfs[resolved]) return { state, output: `grep: ${fileArg}: No such file or directory` };
        sourceText = vfs[resolved].content || '';
      }

      if (!pattern) return { state, output: '' };

      const lines = sourceText.split('\n');
      const filtered = lines.filter((line) => {
        if (isCaseInsensitive) {
          return line.toLowerCase().includes(pattern.toLowerCase());
        }
        return line.includes(pattern);
      });

      return { state, output: filtered.join('\n') };
    }

    case 'wc': {
      let sourceText = stdin;
      if (args.length > 0 && !args[0].startsWith('-')) {
        const resolved = resolvePath(cwd, args[0]);
        if (!vfs[resolved]) return { state, output: `wc: ${args[0]}: No such file or directory` };
        sourceText = vfs[resolved].content || '';
      }
      const lines = sourceText.trim() ? sourceText.split('\n').length : 0;
      const words = sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;
      const bytes = sourceText.length;

      if (args.includes('-l')) {
        return { state, output: `${lines}` };
      }
      return { state, output: `  ${lines}  ${words} ${bytes}` };
    }

    case 'head': {
      const numLines = args[0] === '-n' ? parseInt(args[1], 10) || 10 : 10;
      const fileArg = args[0] === '-n' ? args[2] : args[0];
      let text = stdin;
      if (fileArg) {
        const resolved = resolvePath(cwd, fileArg);
        if (!vfs[resolved]) return { state, output: `head: cannot open '${fileArg}'` };
        text = vfs[resolved].content || '';
      }
      return { state, output: text.split('\n').slice(0, numLines).join('\n') };
    }

    case 'tail': {
      const numLines = args[0] === '-n' ? parseInt(args[1], 10) || 10 : 10;
      const fileArg = args[0] === '-n' ? args[2] : args[0];
      let text = stdin;
      if (fileArg) {
        const resolved = resolvePath(cwd, fileArg);
        if (!vfs[resolved]) return { state, output: `tail: cannot open '${fileArg}'` };
        text = vfs[resolved].content || '';
      }
      const allLines = text.split('\n');
      return { state, output: allLines.slice(Math.max(0, allLines.length - numLines)).join('\n') };
    }

    case 'touch': {
      if (!args[0]) return { state, output: 'touch: missing file operand' };
      const resolved = resolvePath(cwd, args[0]);
      const newVfs = { ...vfs };
      if (!newVfs[resolved]) {
        newVfs[resolved] = {
          type: 'file',
          mode: 'rw-r--r--',
          owner: currentUser,
          size: 0,
          modified: '2026-08-29 11:00',
          content: ''
        };
      } else {
        newVfs[resolved] = { ...newVfs[resolved], modified: '2026-08-29 11:00' };
      }
      return { state: { ...state, vfs: newVfs }, output: '' };
    }

    case 'mkdir': {
      if (!args[0]) return { state, output: 'mkdir: missing operand' };
      const target = args[0].startsWith('-') ? args[1] : args[0];
      const resolved = resolvePath(cwd, target);
      if (vfs[resolved]) return { state, output: `mkdir: cannot create directory '${target}': File exists` };

      const newVfs = { ...vfs };
      newVfs[resolved] = {
        type: 'dir',
        mode: 'rwxr-xr-x',
        owner: currentUser,
        size: 4096,
        modified: '2026-08-29 11:00'
      };
      return { state: { ...state, vfs: newVfs }, output: '' };
    }

    case 'rm': {
      const target = args.find((a) => !a.startsWith('-'));
      if (!target) return { state, output: 'rm: missing operand' };
      const resolved = resolvePath(cwd, target);
      if (!vfs[resolved]) return { state, output: `rm: cannot remove '${target}': No such file or directory` };

      const newVfs = { ...vfs };
      delete newVfs[resolved];
      // Also remove children if directory
      Object.keys(newVfs).forEach((k) => {
        if (k.startsWith(`${resolved}/`)) delete newVfs[k];
      });

      return { state: { ...state, vfs: newVfs }, output: '' };
    }

    case 'chmod': {
      if (args.length < 2) return { state, output: 'chmod: missing operand' };
      const mode = args[0];
      const target = resolvePath(cwd, args[1]);
      if (!vfs[target]) return { state, output: `chmod: cannot access '${args[1]}': No such file or directory` };

      // Convert octal to permission string if 600 or 755
      let formattedMode = mode;
      if (mode === '600') formattedMode = 'rw-------';
      if (mode === '755') formattedMode = 'rwxr-xr-x';
      if (mode === '644') formattedMode = 'rw-r--r--';
      if (mode === '777') formattedMode = 'rwxrwxrwx';

      const newVfs = {
        ...vfs,
        [target]: { ...vfs[target], mode: formattedMode }
      };
      return { state: { ...state, vfs: newVfs }, output: '' };
    }

    case 'find': {
      const searchRoot = args[0] && !args[0].startsWith('-') ? resolvePath(cwd, args[0]) : cwd;
      const nameFlagIdx = args.indexOf('-name');
      const pattern = nameFlagIdx !== -1 ? args[nameFlagIdx + 1] : null;

      const matches = Object.keys(vfs).filter((k) => {
        if (!k.startsWith(searchRoot === '/' ? '/' : searchRoot)) return false;
        if (!pattern) return true;
        const base = k.split('/').pop();
        if (pattern.startsWith('*.')) {
          return base.endsWith(pattern.slice(1));
        }
        return base.includes(pattern);
      });

      return { state, output: matches.join('\n') };
    }

    case 'systemctl': {
      const action = args[0];
      const serviceName = args[1];
      if (!action) return { state, output: 'Usage: systemctl [status|start|stop|restart] <service>' };

      if (!services[serviceName]) {
        return { state, output: `Unit ${serviceName || ''} could not be found.` };
      }

      const s = services[serviceName];
      const updatedServices = { ...services };

      if (action === 'status') {
        const isUp = s.status === 'active';
        return {
          state,
          output: `● ${s.name} - ${s.description}\n     Loaded: loaded (/etc/systemd/system/${s.name}; enabled)\n     Active: ${isUp ? 'active (running)' : 'failed (Result: exit-code)'} since Sat 2026-08-29 10:14:00 CEST\n   Main PID: ${s.pid || '-'}`
        };
      }

      if (action === 'restart' || action === 'start') {
        updatedServices[serviceName] = {
          ...s,
          status: 'active',
          pid: Math.floor(Math.random() * 8000) + 1000
        };
        return {
          state: { ...state, services: updatedServices },
          output: `[ OK ] Started ${s.description}.`
        };
      }

      if (action === 'stop') {
        updatedServices[serviceName] = { ...s, status: 'inactive', pid: null };
        return {
          state: { ...state, services: updatedServices },
          output: `[ OK ] Stopped ${s.description}.`
        };
      }

      return { state, output: `systemctl: Unknown action ${action}` };
    }

    case 'echo': {
      return { state, output: args.join(' ') };
    }

    case 'ps': {
      const running = Object.values(services)
        .filter((s) => s.status === 'active')
        .map((s) => `  ${s.pid} ?        00:00:12 ${s.name.replace('.service', '')}`)
        .join('\n');
      return {
        state,
        output: `  PID TTY          TIME CMD\n    1 ?        00:00:02 systemd\n  852 ?        00:00:05 sshd\n${running}\n 3241 pts/0    00:00:00 bash\n 3290 pts/0    00:00:00 ps`
      };
    }

    case 'df': {
      return {
        state,
        output: `Filesystem     1K-blocks      Used Available Use% Mounted on\n/dev/sda1       41251136  38421044   2830092  93% /\nudev             8152420         0   8152420   0% /dev\ntmpfs            1634884      1200   1633684   1% /run`
      };
    }

    case 'free': {
      return {
        state,
        output: `              total        used        free      shared  buff/cache   available\nMem:        16328512     6421008     7892100      142012     2015404     9765492\nSwap:        2097148           0     2097148`
      };
    }

    case 'history': {
      return { state, output: state.history.map((h, idx) => `  ${idx + 1}  ${h}`).join('\n') };
    }

    case 'whoami':
      return { state, output: currentUser };

    case 'hostname':
      return { state, output: 'prod-srv-01.company.internal' };

    case 'uname':
      return { state, output: 'Linux prod-srv-01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT x86_64 GNU/Linux' };

    default:
      return { state, output: `bash: ${cmd}: command not found` };
  }
}
