# Galaxy Constellation Graph

白いキャンバス上でノードと辺、関連メモを探索する軽量なグラフ可視化アプリです。HTML / CSS / JavaScript のみで動きます。

## 機能
- 検索、カテゴリ絞り込み、一覧表示
- ノードと関連データの詳細パネル
- ドラッグ移動、拡大縮小、全体表示
- キーボード操作とモバイル向けレイアウト

## 起動
```sh
python -m http.server 8000
```
http://localhost:8000 を開いてください。`fetch` を使うため、ファイルの直接ダブルクリックではなくHTTP経由で起動します。依存パッケージ、APIキー、外部APIは不要です。

## データ形式
`data.json` の `nodes` と `edges` を編集します。
- `nodes`: `id`（0から連番）、`title`、`sub`、`group`、`desc`、`date`、`img`、`quotes`（関連メモ配列）、`links`
- `quotes`: `id`、`date`、`text`、`author`。名称は元実装との互換性のため残しており、会話以外の説明や観察メモにも利用できます。
- `edges`: 接続するノードIDのペア
- `group`: SYSTEM / PLAY / MAKE / SIM / LEARN。ラベルや色は `app.js` の `G` で設定します。

現時点のサンプルは26ノードの固定レイアウトです。ノード数を増やす場合は `app.js` の `pos` 座標配列も追加してください。自動レイアウトエンジンではありません。

## プライバシー
このリポジトリは公開用に新規作成した架空データのみを含みます。元の私的会話、識別子、画像、保存先URL、認証情報、元リポジトリ履歴は含めていません。個人データを追加したコピーを公開する際は、公開範囲を必ず確認してください。外部解析タグはありません。

## 検証
```sh
node --check app.js
python tests/validate.py
node tests/smoke.cjs
```
