# GhPython Tutorials

https://ghpython.styublog.com/

1日1モデリングでGrasshopper Pythonを学ぶチュートリアルサイトです。

## 概要

GhPython Tutorialsは、Grasshopper Python（GhPython）を使った3Dモデリングを学ぶためのチュートリアルサイトです。日々の練習を通じて、パラメトリックデザインとPythonプログラミングのスキルを段階的に向上させることができます。

## 特徴

- **日々の練習**: 1日1モデリングのチャレンジ形式
- **実践的な学習**: 具体的なモデリング例を通じたPython学習
- **段階的なレベルアップ**: 難易度別のチュートリアル構成
- **フィルタリング機能**: タイトル検索、タグ、難易度による絞り込み
- **レスポンシブデザイン**: デスクトップ・モバイル対応
- **ダークモード対応**: ライト/ダークテーマの切り替え

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: React Icons
- **画像最適化**: Next.js Image Optimization
- **マークダウン処理**: gray-matter, remark
- **デプロイ**: Vercel

## 機能

### フィルタリング
- **タイトル検索**: チュートリアルタイトルでの検索
- **タグフィルタ**: 関連技術やトピック別の絞り込み
- **難易度フィルタ**: ★1〜★5の難易度レベル別表示

### ビューモード
- **グリッドビュー**: 2列・4列表示の切り替え
- **レスポンシブ**: デバイスサイズに応じた最適な表示

### ナビゲーション
- **ホームボタン**: チュートリアル詳細ページからの簡単な戻り機能
- **スクロールトップ**: ページ上部への素早い移動
- **モバイルドロワー**: スマートフォン向けの使いやすいナビゲーション

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
├── components/             # Reactコンポーネント
│   ├── layout/            # レイアウト関連
│   ├── tutorial/          # チュートリアル関連
│   └── ui/                # UI部品
├── content/tutorials/      # Markdownチュートリアル
├── hooks/                 # カスタムフック
├── lib/                   # ユーティリティ
└── types/                 # TypeScript型定義
```

## チュートリアル構成

各チュートリアルには以下が含まれます：

- **Day番号**: 連続した学習のための日付管理
- **タイトル**: 明確なトピック表示
- **難易度**: ★1〜★5の5段階評価
- **タグ**: 関連技術（array, geometry, transform など）
- **サムネイル**: 視覚的なプレビュー
- **詳細説明**: ステップバイステップの解説

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番環境での起動
npm start
```

## SNS・リンク

- **X (Twitter)**: [@tama20013](https://x.com/tama20013)
- **YouTube**: [Studio Tama](https://www.youtube.com/@studioTama)
- **ブログ**: [styublog.com](https://www.styublog.com/)
- **note**: [tamaru_shuya](https://note.com/tamaru_shuya)
- **Instagram**: [shuya_tamaru](https://www.instagram.com/shuya_tamaru/)
- **GitHub**: [shuya-tamaru](https://github.com/shuya-tamaru)

## ライセンス

© 2024 STUDIO TAMA. All rights reserved.