# Contributing / 開発に参加する前に

[README](README.md) · [日本語](README.ja.md)

The owner has not selected a license. This document describes the review workflow, not a grant of reuse or contribution rights. Discuss contribution terms with the owner before submitting code.

ライセンスは未指定です。本書は再利用・改変の許諾ではありません。コード提供前に所有者と条件を確認してください。

## Reproducible reports / 再現情報
Use the bug template with browser/version, viewport, steps, expected and actual behavior. Use only synthetic data. Do not post personal conversations, credentials or private screenshots. See [security guidance](SECURITY.md) for sensitive findings.

## Development / 開発
Read [data format](docs/data-format.md) and [deployment](docs/deployment.md). Keep changes small and recoverable. Run `node tests/check.cjs` before proposing a patch. Document what was tested and what was not. For UI changes, verify narrow/desktop layouts and interrupted/repeated interactions, not just one happy path.

## Review / レビュー
Include purpose, changed files, tests, privacy review, and screenshots only when they contain approved synthetic data. A passing CI does not establish real-device or screen-reader compatibility.
