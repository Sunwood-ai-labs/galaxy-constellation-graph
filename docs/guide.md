# Operation guide / 操作ガイド

[English home](../README.md) · [日本語](../README.ja.md)

## First steps / はじめに
1. Open the [demo](https://sunwood-ai-labs.github.io/galaxy-constellation-graph/). The interface is Japanese.
2. On a phone-width viewport, start with the node list. On a desktop-width viewport, start with the graph.
3. Search, choose a category, and select a result. Switch between 一覧 (list) and グラフ (graph).

スマホ幅では一覧、PC幅ではグラフから始まります。検索とカテゴリで絞り、ノードを選択します。右上で表示を切り替えられます。

## Controls / 操作
| Action | English | 日本語 |
| --- | --- | --- |
| Search | Searches titles, descriptions and notes | タイトル・説明・メモを検索 |
| Reset filters | Clears search and category together | 「条件をリセット」で検索とカテゴリを解除 |
| Pan / zoom | Drag; wheel or pinch; plus/minus buttons | ドラッグ移動、ホイール・ピンチ・＋／−で拡縮 |
| Fit | 全体を見る fits the entire graph | 「全体を見る」で全体表示 |
| Detail history | 前のノードへ restores the preceding detail | 関連ノードから前の詳細へ戻る |
| Locate | このノードを地図で見る clears filters and centers the node | 条件を解除して対象ノードを中央表示 |
| List order | Toggle 日付順 to change order | 一覧の「日付順」で表示順を切り替え |

## Keyboard / キーボード
Use Tab to reach controls and the searchable list. With the graph focused: arrow keys pan, +/− zoom, and 0 fits. Escape closes the top detail layer first and restores focus; another Escape closes the list when applicable.

Tabで操作ボタンや一覧へ移動できます。グラフにフォーカスした状態で矢印が移動、＋／−が拡縮、0が全体表示です。Escapeは上の詳細を閉じ、元のフォーカスへ戻します。

## Troubleshooting / 困ったとき
- Blank or loading error: use an HTTP server, inspect data.json syntax, unique IDs, and edge endpoints. Retry after correction.
- No search results: clear the category and search with 条件をリセット.
- Labels too small: use list/search or zoom; the overview is not intended to make every note readable.
- Personal data visible publicly: remove it through your normal repository review process; Git history and caches may retain old versions. Do not paste sensitive data into an issue.

読込失敗はHTTP配信、JSON構文、ID重複、辺の参照先を確認してください。検索0件なら条件を解除します。全体図の文字が小さい場合は一覧・検索・拡大を使用してください。秘密や個人情報を不具合報告へ貼らないでください。

## Accessibility / アクセシビリティ
The app provides list navigation, focus indicators, labeled controls, Escape handling, and reduced-motion styling. These features do not establish WCAG conformance. Physical touch devices, Safari and screen readers remain unverified. See [QA](../QA.md) for the exact tested scope.

一覧操作、フォーカス表示、ラベル、Escape対応、動きの抑制設定がありますが、適合性を保証するものではありません。実機・Safari・スクリーンリーダーは未検証です。
