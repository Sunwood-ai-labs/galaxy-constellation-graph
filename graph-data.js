/* Pure validation and normalization; no network or DOM access. */
(function (root) {
  'use strict';
  function safeUrl(value, image = false) {
    if (!value) return '';
    if (typeof value !== 'string' || /[<>"'\\\s]/.test(value)) throw new Error('Invalid URL');
    if (/^https:\/\//i.test(value)) return value;
    if (image && /^assets\/[a-z0-9_./-]+$/i.test(value) && !value.includes('..')) return value;
    throw new Error('Only HTTPS links and local assets images are allowed');
  }
  function normalize(data) {
    if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) throw new Error('nodes and edges must be arrays');
    if (data.nodes.length > 500) throw new Error('Maximum 500 nodes');
    const ids = new Map();
    data.nodes.forEach((n, i) => {
      if (!n || !['string','number'].includes(typeof n.id) || ids.has(n.id)) throw new Error('Unique node IDs required');
      ids.set(n.id, i);
    });
    const text = value => value == null ? '' : String(value);
    const nodes = data.nodes.map((n, i) => ({
      id: i, originalId: n.id, title: text(n.title || n.id), sub: text(n.sub),
      desc: text(n.desc), date: text(n.date), group: text(n.group || 'OTHER'),
      img: safeUrl(n.img, true), links: (n.links || []).map(v => safeUrl(v)),
      quotes: (n.quotes || []).map((q, j) => ({
        id: text(q.id || i + '-' + j), text: text(q.text), date: text(q.date), author: text(q.author)
      }))
    }));
    const edges = data.edges.map(pair => {
      if (!Array.isArray(pair) || pair.length !== 2 || !ids.has(pair[0]) || !ids.has(pair[1])) throw new Error('Edge references an unknown node');
      return pair.map(id => ids.get(id));
    });
    return {nodes, edges, scope: text(data.scope)};
  }
  const api = {normalize, safeUrl};
  if (typeof module !== 'undefined') module.exports = api;
  else root.GraphData = api;
})(globalThis);
