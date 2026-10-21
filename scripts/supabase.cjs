const { spawnSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const path = require('node:path');

// CLI 2.121.0 fails API requests on this Windows machine. Prefer the verified binary.
const managed = process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA,
  'Codex', 'Tools', 'supabase', '2.75.0', 'supabase.exe');
const local = path.join(__dirname, '..', 'node_modules', 'supabase', 'dist', 'supabase.js');
const useManaged = process.platform === 'win32' && managed && existsSync(managed);
const result = spawnSync(useManaged ? managed : process.execPath,
  useManaged ? process.argv.slice(2) : [local, ...process.argv.slice(2)],
  { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
