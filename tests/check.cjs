'use strict';
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const python = process.env.PYTHON || 'python';
const checks = [
  [process.execPath, ['--check','app.js']],
  [process.execPath, ['--check','graph-data.js']],
  [python, ['tests/validate.py']],
  ...['data','smoke','regression','interaction','docs'].map(n => [process.execPath, ['tests/'+n+'.cjs']])
];
for (const [cmd,args] of checks) {
  console.log('\n> '+[cmd,...args].join(' '));
  const r=spawnSync(cmd,args,{cwd:root,stdio:'inherit'});
  if(r.error) console.error(r.error.message);
  if(r.status!==0) process.exit(r.status||1);
}
console.log('\nPASS: all repository checks');
