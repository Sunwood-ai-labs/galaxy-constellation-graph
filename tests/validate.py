import json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
d=json.loads((root/'data.json').read_text())
assert len(d['nodes'])==26
assert [n['id'] for n in d['nodes']]==list(range(26))
assert all(0<=a<26 and 0<=b<26 for a,b in d['edges'])
assert all(n['img'] is None and n['links']==[] for n in d['nodes'])
assert all(q['id'].startswith('demo-') for n in d['nodes'] for q in n['quotes'])
for f in root.rglob('*'):
 if f.is_file() and '.git' not in f.parts and f.name!='validate.py':
  text=f.read_text()
  assert not any(s.lower() in text.lower() for s in ['Sentinel_','libfile_','PRIVATE KEY']),f
print('PASS: schema, edges, synthetic IDs, no private source images or identifiers')
