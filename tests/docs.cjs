'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const files=['README.md','README.ja.md','QA.md','CHANGELOG.md','CONTRIBUTING.md','SECURITY.md','docs/guide.md','docs/data-format.md','docs/deployment.md'];
let links=0;
for(const name of files){
 const s=fs.readFileSync(path.join(root,name),'utf8');
 const targets=[...s.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)].map(m=>m[1]);
 targets.push(...[...s.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]));
 for(const target of targets){
  if(/^(?:https?:|mailto:|#)/.test(target))continue;
  const p=path.resolve(path.dirname(path.join(root,name)),target.split('#')[0]);
  assert(p.startsWith(root+path.sep),'Path outside repo: '+target);
  assert(fs.existsSync(p),name+' -> '+target);links++;
 }
}
for(const name of ['README.md','README.ja.md']){
 const s=fs.readFileSync(path.join(root,name),'utf8');
 assert(s.includes('https://sunwood-ai-labs.github.io/galaxy-constellation-graph/'));
 assert(s.includes('assets/desktop.jpg')&&s.includes('assets/mobile.jpg'));
}
assert(fs.readFileSync(path.join(root,'README.md'),'utf8').includes('README.ja.md'));
assert(fs.readFileSync(path.join(root,'README.ja.md'),'utf8').includes('README.md'));
assert(fs.existsSync(path.join(root,'assets/icon.svg')));
console.log('PASS: '+files.length+' documentation files and '+links+' relative file references');
