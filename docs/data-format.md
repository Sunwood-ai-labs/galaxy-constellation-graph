# Data format / データ形式

[English home](../README.md) · [日本語](../README.ja.md)

Edit `data.json` containing `nodes` and `edges`. データは次の形です。

```json
{
  "nodes": [
    {"id":"a","title":"Example","sub":"Demo","group":"MAKE","desc":"Fictional node",
     "date":"2026-01-01","img":null,
     "quotes":[{"id":"demo-a","date":"2026-01-01","text":"Fictional note","author":"Demo"}],
     "links":[]},
    {"id":"b","title":"Another example","group":"LEARN","quotes":[]}
  ],
  "edges":[["a","b"]]
}
```

## Fields / 項目
| Field | Meaning / 意味 |
| --- | --- |
| id | Unique string or number / 重複しない文字列・数値 |
| title, sub, desc | Label, subtitle, description / 名称・副題・説明 |
| group | Category key / カテゴリ識別子 |
| quotes | Related notes; historic field name / 関連メモ（互換性のため旧名称） |
| date, img, links | Optional date, image and links / 省略可能な日付・画像・リンク |
| edges | Pairs of existing node IDs / 存在するノードIDの組 |

## Limits and privacy / 制限と公開確認
- Maximum 500 nodes. String IDs and custom groups are supported.
- First 26 positions are predefined; later positions use a deterministic spiral, not force layout.
- Links accept HTTPS only. Images accept HTTPS or relative paths under assets/.
- Missing optional notes/images/links/dates are supported. Duplicate IDs and invalid edge endpoints must be corrected.
- Validate your modified dataset separately. The repository's synthetic-data test deliberately expects its fixed 26-node demonstration; do not delete this guard to publish private data.

最大500ノードです。26個までは固定座標、それ以降は決定的な螺旋配置で、力学配置ではありません。リンクはHTTPS、画像はHTTPSまたはassets/配下です。公開前に権利・個人情報・秘密の有無を確認してください。デモ用監査テストは固定サンプルを対象としており、任意データの安全保証ではありません。
