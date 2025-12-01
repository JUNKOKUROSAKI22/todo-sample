# My React TODO App

A simple, modern TODO application built with React and Vite. This project demonstrates component-based architecture, state management with `useReducer`, localStorage persistence, and comprehensive testing.

## Features

✅ **Add, Edit, and Delete TODOs** - Full CRUD operations with a clean UI
✅ **Complete/Uncomplete** - Toggle the completion status of tasks
✅ **Filter TODOs** - View all, active, or completed tasks
✅ **Persistent Storage** - Todos are saved to localStorage and restored on page reload
✅ **Fully Accessible** - Keyboard navigation, ARIA labels, and semantic HTML
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
✅ **Comprehensive Tests** - Unit and integration tests with vitest and React Testing Library

## Project Structure

```
src/
  components/
    TodoApp.jsx         # Main app component with state management
    TodoInput.jsx       # Form for adding/editing todos
    TodoList.jsx        # List container and filter logic
    TodoItem.jsx        # Individual todo item with actions
    FilterBar.jsx       # Filter buttons and stats display
  hooks/
    useTodoReducer.js   # Custom hook for todo state management
    useLocalStorage.js   # Custom hook for localStorage persistence
  styles/
    todo.css            # Responsive styles and accessibility features
  test/
    setup.js            # Test environment configuration
  App.jsx              # Root component
  main.jsx             # App entry point

docs/
  設計書_TODOアプリ.md   # Design document (Japanese)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

Run tests in watch mode:

```bash
npm test
```

Run tests once (CI mode):

```bash
npm test -- --run
```

Run tests with UI:

```bash
npm run test:ui
```

## Data Model

Each TODO object has the following structure:

```javascript
{
  id: "string",           // Unique identifier (timestamp-based)
  text: "string",         // Todo description
  completed: boolean,     // Completion status
  createdAt: number       // Creation timestamp
}
```

## Storage

TODOs are persisted to localStorage with the key `my-react-app:todos:v1`. This versioning allows for future migrations.

## Acceptance Criteria (MVP)

- ✅ Add new TODO items via input form
- ✅ Toggle TODO completion status
- ✅ Delete TODO items
- ✅ Filter TODOs (All / Active / Completed)
- ✅ Persist data across browser sessions
- ✅ Full keyboard accessibility
- ✅ Responsive UI (mobile-first design)
- ✅ All tests passing

## Design Document

See [`docs/設計書_TODOアプリ.md`](./docs/設計書_TODOアプリ.md) for detailed architecture, component design, state management strategy, and implementation notes (in Japanese).

## Technologies Used

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **vitest** - Unit testing framework
- **@testing-library/react** - React component testing utilities
- **localStorage API** - Client-side persistence

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm test -- --run` | Run tests once |
| `npm run test:ui` | Run tests with UI |
| `npm run lint` | Run ESLint |

## Keyboard Shortcuts

- **Enter** - Add or update a TODO
- **Escape** - Cancel editing mode (when in edit)
- **Tab** - Navigate between form controls
- **Space/Enter** - Toggle checkbox or activate buttons

## Accessibility

This application includes:

- Semantic HTML (`<form>`, `<ul>`, `<li>`, `<button>`)
- ARIA labels and roles for interactive elements
- Keyboard-navigable interface
- Sufficient color contrast (WCAG AA)
- Support for `prefers-reduced-motion` and `prefers-contrast`
- Live regions for status updates

## Future Enhancements

- Local categories/tags for todos
- Due dates and reminders
- Drag-and-drop reordering
- Dark mode toggle persistence
- Backend API integration
- Multi-user sync

## License

MIT
