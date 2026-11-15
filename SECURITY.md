# Security / セキュリティ

This static demo has no login, backend, or security support SLA. Do not use it as a secure store.

## Reporting / 報告
Do not open a public issue containing exploit details that would expose private data, credentials, or personal screenshots. If GitHub shows a private vulnerability-reporting option, use it; otherwise ask the maintainer for a private reporting route without posting sensitive details. This repository does not claim that private reporting is currently enabled.

非公開の報告機能が表示される場合はそちらを利用してください。表示されない場合は機微な内容を書かずに、所有者へ非公開の連絡方法を確認してください。対応期限は保証していません。

## Data boundaries / データの境界
- Public demo data is fictional. Review any replacement before publishing.
- URL restrictions and escaping are defensive checks, not a guarantee that third-party content is trustworthy.
- HTTPS images or links can contact external hosts if added. Do not add tracking URLs or unapproved images.
- Do not include secrets in source, Git history, screenshots, issues, or exported archives.
- See [verification scope](QA.md) and [data constraints](docs/data-format.md).
