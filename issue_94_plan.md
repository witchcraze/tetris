### Implementation Proposal

To resolve this Issue, I will proceed with the implementation according to the following plan.

**リファクタリングの具体的なステップ:**

1.  **現在のビルド時間の測定とバンドルサイズの確認:**
    - まず、現在のビルド時間とバンドルサイズを測定し、改善のベースラインを設定します。
    - `npm run build` コマンドを実行し、その出力から情報を収集します。

2.  **Webpack設定の分離:**
    - `webpack.config.js` を `webpack.dev.js` と `webpack.prod.js` に分離し、開発環境と本番環境で異なる設定を使用できるようにします。
    - 共通の設定は `webpack.common.js` に抽出します。

3.  **ビルド時間の短縮:**
    - Webpackのパフォーマンス最適化オプション（例: `cache`, `thread-loader`, `terser-webpack-plugin` の設定など）を検討します。
    - 不要なローダーやプラグインを削除します。

4.  **バンドルサイズの最適化:**
    - Webpackのバンドルサイズ最適化オプション（例: `optimization.minimize`, `optimization.splitChunks`, `Tree Shaking` など）を検討します。
    - `webpack-bundle-analyzer` などのツールを使用して、バンドル内容を分析し、大きなモジュールを特定します。

5.  **CI/CDパイプラインへの組み込み:**
    - GitHub ActionsなどのCI/CDツールが導入されている場合、ビルドプロセスを自動化し、ビルド時間やバンドルサイズの監視を追加することを検討します。

**Files to be changed:**
- `webpack.config.js` (削除またはリネーム)
- `webpack.common.js` (新規作成)
- `webpack.dev.js` (新規作成)
- `webpack.prod.js` (新規作成)
- `package.json` (ビルドスクリプトの更新)

#### 1. **Contribution to Project Goals**
この改善は、開発効率を向上させ、デプロイメントプロセスを簡素化するというプロジェクトの重要な目標に直接貢献します。ビルド時間の短縮は開発者の生産性を高め、バンドルサイズの最適化はアプリケーションのロード時間を短縮し、ユーザーエクスペリエンスを向上させます。

#### 2. **Overview of Changes**
Webpack設定を開発用と本番用に分離し、共通設定を抽出します。これにより、各環境に特化した最適化を適用できるようになります。また、ビルド時間とバンドルサイズの最適化のためのWebpackオプションを適用します。

#### 3. **Specific Work Content for Each File**
- `webpack.config.js`:
    - 既存の設定を `webpack.common.js` に移動し、このファイルを削除またはリネームします。
- `webpack.common.js`:
    - 開発環境と本番環境で共通するWebpack設定を定義します。
- `webpack.dev.js`:
    - 開発環境に特化したWebpack設定を定義します（例: ソースマップ、開発サーバーの設定）。
- `webpack.prod.js`:
    - 本番環境に特化したWebpack設定を定義します（例: コードの圧縮、Tree Shaking、バンドルアナライザー）。
- `package.json`:
    - `scripts` セクションの `build` コマンドを更新し、開発用と本番用のビルド設定を呼び出すようにします。

---
If you approve, please reply to this comment with "Approve".