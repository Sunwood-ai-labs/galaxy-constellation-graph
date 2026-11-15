<div align="center">

<img src="assets/icon.svg" width="80" alt="Galaxy Constellation Graph icon">

# Galaxy Constellation Graph

Explore connected ideas as a constellation of nodes, links, and notes.

[![Checks](https://github.com/Sunwood-ai-labs/galaxy-constellation-graph/actions/workflows/check.yml/badge.svg)](https://github.com/Sunwood-ai-labs/galaxy-constellation-graph/actions/workflows/check.yml)

**English** · [日本語](README.ja.md)

[Open live demo](https://sunwood-ai-labs.github.io/galaxy-constellation-graph/) · [User guide](docs/guide.md) · [Data format](docs/data-format.md)

</div>

A lightweight, white-canvas graph explorer built with HTML, CSS, JavaScript, and SVG. No package install, API key, external API, or build step is needed. The interface is Japanese; documentation is available in English and Japanese.

## ✨ What it does
- Search node titles, descriptions, and notes; combine search with category filters.
- Explore the graph or a readable list, then open details and related nodes.
- Pan, zoom, fit the graph, and navigate using a keyboard.
- Start in list view on narrow screens and switch to the graph when needed.

This is not an astronomy simulator, automatic force-layout engine, or large-scale graph database. The 26 sample nodes and 156 notes are fictional. The first 26 node positions are hand-arranged; additional nodes use a deterministic spiral. The input limit is 500 nodes.

## 🖼 Screenshots
These are actual browser captures of the synthetic demo, not generated mockups.

![Desktop constellation graph using fictional sample data](assets/desktop.jpg)

<details>
<summary>Mobile screenshot</summary>
<img src="assets/mobile.jpg" alt="Synthetic demo at 390-pixel mobile viewport width" width="390">
</details>

## 🚀 Run locally
Install Python 3 and run from this repository:

```sh
python -m http.server 8000
```

Open <http://localhost:8000>. If you use uv, `uv run --no-project python -m http.server 8000` is equivalent. Do not open index.html directly: loading JSON uses HTTP fetch. Bind to localhost with `--bind 127.0.0.1` if other devices should not connect.

## 🧭 Learn and customize
- [Operation, keyboard controls, troubleshooting / 操作ガイド](docs/guide.md)
- [Data schema and limits / データ形式](docs/data-format.md)
- [Static deployment and validation / 配布と検証](docs/deployment.md)
- [Verification record and untested environments](QA.md)
- [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Changelog](CHANGELOG.md)

Edit `data.json` to change nodes, edges, and notes. Keep personal data and secrets out of a public deployment. Category names and colors are configured in `app.js`.

## 🧪 Validate
Node.js 22 and Python 3.12 match CI. No npm dependencies are required.

```sh
node tests/check.cjs
```

The command runs JavaScript syntax checks, synthetic-data checks, data/interaction regressions, and documentation links. It exits nonzero if any check fails. These tests include mock DOM checks; they are not proof of physical-device or assistive-technology compatibility.

## 📁 Repository
| Path | Purpose |
| --- | --- |
| `index.html`, `style.css` | Accessible controls, layout, and presentation |
| `app.js`, `graph-data.js` | Interaction and data normalization |
| `data.json` | Fictional demonstration dataset |
| `assets/` | Real screenshots and project icon |
| `docs/`, `tests/` | Guides and verification |

## 🔒 Privacy and limitations
No authentication, analytics tags, or external API calls are included. The public sample contains no original private conversations, source images, or credentials. User-supplied links and images still need review: HTTPS alone does not establish trust or permission.

Windows Chrome and responsive viewport testing are recorded in [QA.md](QA.md). Physical iPhone/Android devices, Safari, screen readers, and OS keyboards are not verified. Pinch testing used synthetic events. No WCAG conformance claim is made.

## ⚖ License
No license has been selected by the owner. Public visibility is not a blanket permission to redistribute or modify this code. A license decision remains open; no license badge or permission grant is implied.
