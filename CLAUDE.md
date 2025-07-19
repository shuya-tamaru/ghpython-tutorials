# GhPython Learning Site - Project Memory

## プロジェクト概要

Grasshopper Python（GhPython）でのモデリングを学べるチュートリアルサイト。1 日 1 モデリングチャレンジ形式で、ユーザーはローカルで Grasshopper を立ち上げ、Web サイトを見ながら学習する。

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React
- React Icons (CgShapeTriangle)
- Framer Motion (アニメーション)
- Prism.js (シンタックスハイライト)

## プロジェクトアーキテクチャ

### フォルダ構成

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── tutorial/
│       ├── [day]/
│       │   └── page.tsx
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── CodeBlock.tsx
│   │   ├── TutorialCard.tsx
│   │   ├── DifficultyStars.tsx
│   │   ├── TagFilter.tsx
│   │   ├── ViewToggle.tsx
│   │   └── SkeletonLoader.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── RightSidebar.tsx
│   │   └── Footer.tsx
│   └── tutorial/
│       ├── TutorialGrid.tsx
│       ├── TutorialContent.tsx
│       └── TutorialImage.tsx
├── lib/
│   ├── tutorials.ts
│   ├── tags.ts
│   └── utils.ts
├── content/
│   └── tutorials/
│       ├── day001.md
│       ├── day002.md
│       ├── day003.md
│       ├── day004.md
│       └── ...
└── public/
    ├── contents/
    │   ├── day001/
    │   │   └── thumbnail.webp
    │   │
    │   ├── day002/
    │   │   └── thumbnail.webp
    │   │
    │   └── ...
    └── images/
        └── placeholder.jpg
```

## UI 要件

### レイアウト構成

- **Header**: 固定ヘッダー
  - 左上: ロゴ（CgShapeTriangle）+ STUDIO TAMA
  - 右側: SNS リンク [X, Instagram, ブログ, note] + ダークモード/ライトモード切り替え
- **メインコンテンツ**: 左右サイドバー + 中央コンテンツ領域
- **サイドバー**: 左右両方に配置、タグフィルター機能

### レスポンシブデザイン

- **デスクトップ**: 2 列グリッド（4 列切り替え可能）
- **モバイル**: 1 列グリッド
- ブレークポイント: sm(640px), md(768px), lg(1024px), xl(1280px)
- サイドバーは md 以下でドロワー

### カラーパレット

- Primary: Grasshopper 緑 (#7CB342)
- Secondary: Python 青 (#3776AB)
- Background: ニュートラル (#F8F9FA)
- Text: (#1F2937)
- Code Background: (#F3F4F6)
- Card Background: (#FFFFFF)
- Border: (#E5E7EB)

### タイポグラフィ

- Heading: Inter font-family
- Body: Inter font-family
- Code: JetBrains Mono font-family

## コンテンツ構成

### Markdown ファイル構成

各チュートリアルは以下の frontmatter を持つ：

```yaml
---
day: Day 1
title: XY方向に並ぶキューブ
difficulty: 1.0
tags: [array, grid, box, move]
---
```

### ファイル構成例

```
public/contents/day001/
└── thumbnail.webp    # カード表示用サムネイル

content/tutorials/day001.md
```

### チュートリアルページ構成

1. **メタ情報** - Day, Title, Difficulty (星表示), Tags
2. **Inputs** - 必要な入力パラメータ
3. **Outputs** - 出力される結果
4. **コード** - Python コード（シンタックスハイライト）

### カード表示内容

- サムネイル画像（スケルトンローダー付き）
- Day 番号
- タイトル
- 難易度（星 5 段階）
- タグ（複数）
- ホバーエフェクト

### プレースホルダー画像

- 画像が存在しない場合の代替
- 適切なアスペクト比を維持

## 機能仕様

### 必須機能

- **チュートリアル一覧表示**
  - 2 列/4 列グリッド切り替え
  - レスポンシブデザイン
  - カード形式表示
- **タグフィルター機能**
  - サイドバーでタグ一覧表示
  - 複数タグ選択（トグル形式）
  - 選択したタグでフィルタリング
- **難易度表示**
  - 星 5 段階表示
  - 難易度によるフィルタリング
- **シンタックスハイライト**
  - Python コード対応
  - コードブロックの見やすい表示
- **画像表示**
  - サムネイル表示
  - スケルトンローダー
  - 遅延読み込み
- **テーマ切り替え**
  - ダークモード/ライトモード
  - ローカルストレージに保存

### 推奨機能

- 検索機能

### SNS リンク

- X (Twitter)
- Instagram
- ブログ
- note

すべてアイコンでリンクに飛ぶ

## デザインガイドライン

### コンポーネント設計

- アトミックデザイン採用
- 再利用可能なコンポーネント
- Props の TypeScript 型定義必須
- モダンな UI/UX デザイン

### カード設計

- **大きめのカード**: サムネイル + メタ情報
- **ホバーエフェクト**: 滑らかなアニメーション
- **レイアウト**: 2 列/4 列切り替え可能
- **レスポンシブ**: モバイルで 1 列

### 難易度表示

- **星アイコン**: 7 段階評価
- **視覚的表現**: 塗りつぶしとアウトライン
- **カラー**: 難易度に応じたグラデーション

### タグ表示

- **チップ形式**: 角丸の小さなボックス
- **カラーバリエーション**: タグ種類による色分け
- **選択状態**: アクティブ/非アクティブの明確な区別

### ヘッダー

- **ロゴ**: CgShapeTriangle + STUDIO TAMA
- **SNS アイコン**: 統一されたスタイル
- **テーマ切り替え**: トグルボタン
- **固定ヘッダー**: スクロール時も常に表示

### コードブロック

- **シンタックスハイライト**: Python 専用
- **行番号表示**: 左側に配置
- **コピーボタン**: 右上に配置
- **背景色**: テーマに応じた色分け

## 開発ワークフロー

### コーディング標準

- ESLint + Prettier
- TypeScript strict mode
- TailwindCSS utilities-first
- React hooks 使用
- カスタムフック活用

### 命名規則

- コンポーネント: PascalCase
- ファイル: kebab-case
- 関数: camelCase
- 定数: UPPER_SNAKE_CASE

### Git 規則

- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: スタイル変更
- refactor: リファクタリング

## コンテンツ作成指針

### Markdown 形式

- **Front matter**: day, title, difficulty, tags
- **コードブロック**: ```python
- **画像参照**: public/contents/dayXXX/ 内の画像
- **構造**: Inputs → Outputs → コード → 説明

### 画像要件

- **サムネイル**: thumbnail.jpg (カード表示用)
- **結果画像**: result.jpg (チュートリアル内表示用)
- **形式**: JPG, PNG, WebP 推奨
- **サイズ**: サムネイル 400x300px、結果画像 800x600px
- **alt text**: 必須
- **プレースホルダー**: 画像がない場合の代替表示

### スケルトンローダー

- **画像読み込み時**: アニメーション付きスケルトン
- **カード表示**: サムネイル部分にスケルトン
- **パフォーマンス**: 遅延読み込み対応

### サンプルコンテンツ

現在 4 つのチュートリアルが存在：

- day001: XY 方向に並ぶキューブ
- day002: Z 方向に並ぶルーバー
- day003: Z 方向に並ぶ Sin 変位ルーバー
- day004: 波打つ球体リング

## パフォーマンス指針

- 画像最適化
- 遅延読み込み
- Core Web Vitals 最適化
- Static Generation 活用
- SEO を考慮した実装
