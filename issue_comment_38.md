### Implementation Proposal

To resolve this Issue, I will proceed with the implementation according to the following plan.

**Files to be changed:**
- `src/core/Game.ts`
- `src/graphics/Renderer.ts`

#### 1. **Contribution to Project Goals**
- この変更は、ラインクリアとレベルアップ時に視覚的なフィードバックを提供することで、プレイヤーの達成感を高め、ゲーム体験を向上させます。

#### 2. **Overview of Changes**
- `Game.ts`でラインクリアとレベルアップのイベントを検出し、`Renderer.ts`にそのイベントを通知するメカニズムを導入します。
- `Renderer.ts`で、通知されたイベントに基づいて、一時的な視覚効果（例: ラインクリア時の行の点滅、レベルアップ時の画面フラッシュやテキスト表示）を実装します。

#### 3. **Specific Work Content for Each File**
- `src/core/Game.ts`:
    - `clearLines()`メソッドがラインをクリアした際に、クリアされた行の数と行のインデックスを`Game`クラス内で保持し、`Renderer`に渡せるようにします。
    - `checkLevelUp()`メソッドがレベルアップを検出した際に、新しいレベルを`Game`クラス内で保持し、`Renderer`に渡せるようにします。
    - これらのイベントを`Renderer`に通知するためのコールバックまたはイベント発行メカニズムを導入します。
- `src/graphics/Renderer.ts`:
    - ラインクリア時の視覚効果（例: クリアされた行を数フレーム点滅させる）を実装します。これは、`drawBoard`メソッド内でクリアされた行を特別に描画することで実現できます。
    - レベルアップ時の視覚効果（例: 画面全体を短時間フラッシュさせる、または「LEVEL UP!」のようなテキストを中央に表示する）を実装します。
    - これらの効果を管理するための状態変数と、効果の持続時間を制御するためのタイマーを追加します。

---
If you approve, please reply to this comment with "Approve".