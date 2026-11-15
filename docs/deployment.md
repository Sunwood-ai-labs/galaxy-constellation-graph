# Deployment and validation / 配布と検証

[English home](../README.md) · [日本語](../README.ja.md)

## Static hosting / 静的配信
No build is needed. Serve the repository through HTTP. The published demo uses GitHub Pages from main / root, not a custom build workflow. Relative asset paths support the repository subpath.

ビルド不要です。現在の公開デモはGitHub Pagesのmain / root配信です。配信するのは公開可能と確認したデータだけにしてください。

Required runtime files: index.html, style.css, app.js, graph-data.js, data.json, and referenced assets.

## Local checks / ローカル検証
Use Node.js 22 and Python 3.12:
```sh
node tests/check.cjs
```
If Python is only available as python3:
```sh
PYTHON=python3 node tests/check.cjs
```
On PowerShell:
```powershell
$env:PYTHON = "python"
node tests/check.cjs
```

CI uses the same aggregate command. Individual checks remain runnable from tests/. The documentation checker checks relative file targets, not external server uptime or every in-page anchor.

CIも同じ一括コマンドを実行します。文書チェックは相対ファイル参照の存在を検証し、外部サーバーの稼働や全ページ内アンカーを保証しません。

## Release checklist / 公開前
1. Run all checks and inspect the changed files.
2. Check that only fictional or explicitly approved public data is included.
3. Test desktop and narrow-screen flows, including search with zero results, related-node Back, Escape, pan/zoom and repeated navigation.
4. After publishing, verify the commit, CI and live site separately.
5. Preserve [QA limitations](../QA.md); do not call mocked gestures hardware tests.

ライセンスは未指定です。公開範囲や権限は変更せず、リリース・配布条件は所有者の判断を尊重してください。

## Browser regression automation
The optional development dependency is pinned in package-lock.json. Run `npm ci`, `npx playwright install chromium webkit`, then `npm run test:browser`. CI installs Linux browser dependencies automatically. The suite starts a loopback-only Python HTTP server and tests actual Chromium (1440/390 px) and WebKit (390 px) engines: search/reset, detail/history/focus restoration, keyboard pan/zoom/reset, overflow, runtime errors and failed data loading. These are automated desktop browser engines with viewport overrides, not physical phones or installed Safari. Multi-touch, OS keyboards and screen readers remain outside this suite.
