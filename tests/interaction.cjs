// Behavioral interaction tests. This is a DOM harness, not a browser/touch-device test.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const GraphData = require('../graph-data.js');

async function boot(width = 390, height = 844) {
  const elements = new Map(), handlers = {}, windowHandlers = {}, errors = [];
  const document = {activeElement: null};
  function el(selector) {
    if (!elements.has(selector)) {
      const classes = new Set();
      elements.set(selector, {
        hidden: ['#drawer', '#shade', '#list', '#detailBack', '#resetFilters'].includes(selector),
        disabled: false, inert: false, isConnected: true, textContent: '', value: '',
        innerHTML: '', scrollTop: 0, dataset: {}, attributes: {}, style: {},
        classList: {add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c),
          toggle(c, state) { state = state === undefined ? !classes.has(c) : state; state ? classes.add(c) : classes.delete(c); return state; }},
        setAttribute(k, v) { this.attributes[k] = String(v); },
        getAttribute(k) { return this.attributes[k] ?? null; },
        removeAttribute(k) { delete this.attributes[k]; },
        toggleAttribute(k, state) { if (state) this.attributes[k] = ''; else delete this.attributes[k]; },
        focus() { document.activeElement = this; }, blur() {},
        setPointerCapture(id) { this.capture = id; }, releasePointerCapture() {},
        getBoundingClientRect() { return {left: 0, top: 0, width, height}; },
        querySelector() { return null; },
        querySelectorAll() { return selector === '#drawer' ? [el('#detailBack'), el('#close'), el('#modalLast')] : []; },
        closest() { return null; }, matches() { return false; },
        addEventListener(type, callback) { this['on' + type] = callback; }
      });
    }
    return elements.get(selector);
  }
  const groups = ['ALL','SYSTEM','PLAY','MAKE','SIM','LEARN'].map(group => {
    const item = el('#group-' + group); item.dataset.group = group; return item;
  });
  Object.assign(document, {
    querySelector: el, querySelectorAll: s => s === '[data-group]' ? groups : [],
    body: el('body'), addEventListener: (type, callback) => { handlers[type] = callback; }
  });
  document.activeElement = el('#search');
  const data = {scope: 'Synthetic interaction fixture', nodes: [
    {id: 'a', title: 'Alpha', group: 'MAKE', quotes: [{id:'q-a', text:'alpha note'}]},
    {id: 'b', title: 'Beta', group: 'PLAY', quotes: [{id:'q-b', text:'beta note'}]},
    {id: 'c', title: 'Gamma', group: 'MAKE', quotes: []}
  ], edges: [['a','b'],['b','c']]};
  const context = {document, GraphData, innerWidth: width, innerHeight: height,
    fetch: async () => ({ok:true, json:async () => data}),
    addEventListener: (type, callback) => { windowHandlers[type] = callback; },
    console: {error: e => errors.push(e)},
    requestAnimationFrame: callback => callback(),
    matchMedia: () => ({matches: width < 650, addEventListener(){}})
  };
  await vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'), context);
  assert.equal(errors.length, 0, errors.map(String).join('\n'));
  function click(selector, dataset) {
    const target = selector === '[data-group]' ? groups.find(g => g.dataset.group === dataset.group) : {dataset};
    handlers.click({target:{closest:s => s === selector ? target : null}});
  }
  function key(key, options = {}) {
    const event = {key, shiftKey:false, target:document.activeElement || el('#search'), prevented:false,
      preventDefault(){this.prevented=true;}, ...options};
    handlers.keydown(event); return event;
  }
  function camera() {
    const value = el('#world').getAttribute('transform');
    const match = /translate\(([-\d.e+]+),([-\d.e+]+)\) scale\(([-\d.e+]+)\)/.exec(value);
    assert(match, 'Finite transform required: ' + value);
    const [x,y,scale] = match.slice(1).map(Number);
    assert([x,y,scale].every(Number.isFinite));
    return {x,y,scale};
  }
  const pointer = (id,x,y) => ({pointerId:id, clientX:x, clientY:y, target:el('#map'), preventDefault(){}});
  return {el, document, handlers, windowHandlers, context, click, key, camera, pointer};
}
function near(actual, expected, label) { assert(Math.abs(actual-expected) < 1e-8, `${label}: ${actual} != ${expected}`); }

(async () => {
  for (const width of [390, 1440]) {
    const t = await boot(width), {el, camera, pointer} = t, map = el('#map');
    const initial = camera();
    map.onpointerdown(pointer(1,100,500)); map.onpointermove(pointer(1,170,540));
    near(camera().x, initial.x+70, 'drag x'); near(camera().y, initial.y+40, 'drag y');
    map.onpointercancel(pointer(1,170,540)); const canceled = camera();
    map.onpointermove(pointer(1,250,650)); assert.deepEqual(camera(), canceled, 'canceled pointer must stop panning');
    el('#reset').onclick(); assert.deepEqual(camera(), initial, 'overview reset');
    const cursor = {x:width*.7,y:350}; const before = camera();
    const worldPoint = {x:(cursor.x-before.x)/before.scale, y:(cursor.y-before.y)/before.scale};
    let prevented = false;
    map.onwheel({clientX:cursor.x,clientY:cursor.y,deltaY:-100,preventDefault(){prevented=true;}});
    assert(prevented); assert(camera().scale > before.scale);
    near((cursor.x-camera().x)/camera().scale,worldPoint.x,'wheel anchor x');
    near((cursor.y-camera().y)/camera().scale,worldPoint.y,'wheel anchor y');
    el('#reset').onclick();
    map.onpointerdown(pointer(1,100,400)); map.onpointerdown(pointer(2,200,400));
    const pinchStart=camera(), anchor={x:(150-pinchStart.x)/pinchStart.scale,y:(400-pinchStart.y)/pinchStart.scale};
    map.onpointermove(pointer(2,250,400)); assert(camera().scale > initial.scale, 'synthetic two-pointer pinch grows scale');
    near((175-camera().x)/camera().scale,anchor.x,'moving pinch centroid x');
    near((400-camera().y)/camera().scale,anchor.y,'moving pinch centroid y');
    map.onpointercancel(pointer(2,250,400)); const rebased=camera();
    map.onpointermove(pointer(1,130,430)); near(camera().x,rebased.x+30,'remaining pointer pan x'); near(camera().y,rebased.y+30,'remaining pointer pan y');
    near(camera().scale,rebased.scale,'remaining pointer preserves scale');
    const afterCancel=camera(); map.onpointermove(pointer(2,400,700));
    assert.deepEqual(afterCancel,camera(),'canceled secondary pointer ignored');
    map.onpointerup(pointer(1,130,430));
    const node={dataset:{open:'0'},closest(s){return s==='[data-open]'?this:s==='#map'?map:null;}};
    map.onpointerdown({...pointer(3,100,400),target:node});
    map.onpointermove({...pointer(3,140,420),target:node}); map.onpointerup(pointer(3,140,420));
    t.handlers.click({target:node}); assert(el('#drawer').hidden,'node drag must not open details');
    map.onpointerdown({...pointer(4,140,420),target:node}); map.onpointerup(pointer(4,140,420));
    t.handlers.click({target:node}); assert(!el('#drawer').hidden,'fresh node tap opens details'); el('#close').onclick();
    el('#reset').onclick(); assert.deepEqual(camera(),initial);
    for(let i=0;i<80;i++) el('#minus').onclick(); assert(camera().scale>0);
    for(let i=0;i<80;i++) el('#plus').onclick(); assert(camera().scale<=3);
    el('#reset').onclick();
    for(let i=0;i<3;i++) {
      t.click('[data-group]',{group:'PLAY'}); el('#search').oninput({target:{value:'Alpha'}});
      assert(!el('#results').innerHTML.includes('class="list-row"')); camera();
      el('#resetFilters').onclick(); assert.equal(el('#search').value,'');
      assert.equal((el('#results').innerHTML.match(/class="list-row"/g)||[]).length,3);
    }
    el('#search').focus(); t.click('[data-open]',{open:'0'});
    const first = el('#detail').innerHTML; el('#drawer').scrollTop=87;
    t.click('[data-open]',{open:'1'}); assert.notEqual(el('#detail').innerHTML,first);
    el('#detailBack').onclick(); assert.equal(el('#detail').innerHTML,first); assert.equal(el('#drawer').scrollTop,87);
    el('#modalLast').focus(); assert(t.key('Tab').prevented); assert.equal(t.document.activeElement,el('#close'));
    el('#close').focus(); assert(t.key('Tab',{shiftKey:true}).prevented); assert.equal(t.document.activeElement,el('#modalLast'));
    if(el('#list').hidden) el('#resultSummary').onclick();
    t.key('Escape'); assert.equal(el('#drawer').hidden,true); assert.equal(t.document.activeElement,el('#search'));
    assert.equal(el('#list').hidden,false,'closing details preserves underlying list');
    assert(el('body').classList.contains('list-open'));
    t.key('Escape'); assert.equal(el('#list').hidden,true);
    assert(!el('body').classList.contains('list-open')); assert.equal(t.document.activeElement,el('#listToggle'));
    t.context.innerWidth = 740; t.context.innerHeight = 320; t.windowHandlers.resize(); camera();
    console.log(`PASS: ${width}px drag/cancel, wheel anchor, synthetic pinch, zoom/reset, repeated filters, detail history, modal Tab/Escape, resize`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
