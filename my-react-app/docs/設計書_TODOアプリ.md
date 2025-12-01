# TODOアプリ設計書

この設計書は、既存の React + Vite プロジェクト (`my-react-app`) に対してシンプルな TODO アプリを実装するための設計をまとめたものです。

**概要**
- **目的**: シンプルで使いやすい TODO 管理アプリを作成し、学習/プロダクト両方で再利用できる構成にする。
- **ターゲット**: 単一ページの小規模アプリ（クライアントサイドのみ、サーバは不要）。

**スコープ（MVP）**
- TODO の追加、編集、削除
- 完了（toggle）機能
- フィルタ（全て / 未完了 / 完了）
- 永続化：`localStorage`
- シンプルな UI とアクセシビリティ対応

**主要画面 / 要素**
- メイン画面: `TodoApp` コンポーネント
  - `TodoInput`（新規追加 / 編集）
  - `FilterBar`（フィルタ切替）
  - `TodoList`（項目一覧）
  - `TodoItem`（個別項目）

**コンポーネント設計**
- `TodoApp.jsx`
  - 役割: アプリのルート。状態管理（Reducer あるいは useState）と永続化ロジックを持つ。
  - props: なし（ルート）

- `TodoInput.jsx`
  - 役割: 新規 TODO 入力フォーム。編集モードも兼ねる。
  - props: `onAdd(todoText)`, `onUpdate(id, text)`, `editingTodo` (optional)

- `FilterBar.jsx`
  - 役割: フィルタ切替 UI（buttons または select）
  - props: `filter`, `onChangeFilter(filter)`

- `TodoList.jsx`
  - 役割: フィルタ済みの todo 配列を受け取り、`TodoItem` を列挙する。
  - props: `todos`, `onToggle(id)`, `onDelete(id)`, `onEdit(id)`

- `TodoItem.jsx`
  - 役割: 単一の todo 表示。完了チェック、編集、削除を持つ。
  - props: `todo`, `onToggle`, `onDelete`, `onEdit`

**データモデル**
- Todo オブジェクト（例）:
```json
{
  "id": "string",    // uuid or timestamp
  "text": "string",
  "completed": false,
  "createdAt": 1670000000000
}
```

**状態管理**
- 選択肢:
  - シンプル: `useState`（小規模なら可）
  - 推奨（拡張性）: `useReducer`（add/toggle/edit/delete/clear actions を持つ）

- 初期化: `useEffect` または reducer の初期化関数で `localStorage` から読み込み。
- 永続化: state が変化したら `localStorage` に保存（`useEffect` で監視）。

**永続化キー**
- `localStorage` キー: `my-react-app:todos:v1`
- バージョン管理を入れて将来のマイグレーションに備える。

**UI / スタイル**
- ファイル: `src/App.css`（または `src/components/*.css`）
- シンプルでレスポンシブ（モバイル優先）。
- メインのアクセントカラー 1 つ、読みやすいフォントサイズ。

**アクセシビリティ**
- ラベルの明示: `label` と `aria-label` を適切に使用。
- キーボード操作: Enter で追加、Escape で編集キャンセル。
- コントラスト: WCAG AA を目標。
- 完了チェックに `aria-checked` を付与。

**テスト戦略**
- ロジック: Reducer をユニットテスト（`vitest`）
- コンポーネント: `@testing-library/react` で振る舞いテスト（追加・完了・削除・フィルタ）
- CI（オプション）: GitHub Actions で `npm test` を実行

**ファイル構成（提案）**
```
src/
  components/
    TodoApp.jsx
    TodoInput.jsx
    TodoList.jsx
    TodoItem.jsx
    FilterBar.jsx
  hooks/
    useLocalStorage.js    // optional helper
  styles/
    todo.css
  main.jsx
  App.css
```

**実装ステップ（簡易）**
1. `TodoApp` を作成してダミーの静的リストを表示（表示確認）。
2. `TodoInput` を作り追加機能を接続。
3. `useReducer`（または `useState`）で状態管理へ移行。
4. `localStorage` の読み書きを追加。
5. `FilterBar` とフィルタ機能を実装。
6. 編集・削除機能を実装。
7. スタイルとアクセシビリティ修正。
8. テスト追加。

**受け入れ基準（MVP）**
- 新規 TODO を追加できる。
- TODO を完了 / 未完了 に切替できる。
- TODO を削除できる。
- フィルタで表示を切替できる。
- ブラウザ再読み込み後も TODO が保持される（`localStorage`）。
- キーボード操作で主要な機能が利用できる。

**開発コマンド**
- 依存インストール: `npm install`
- 開発サーバ: `npm run dev`
- ビルド: `npm run build`
- テスト（推奨）: `npm run test` （`vitest` を追加する場合）

---

設計書はここまでです。実装フェーズに進める場合は、次にコンポーネントのスケルトンを作成します。