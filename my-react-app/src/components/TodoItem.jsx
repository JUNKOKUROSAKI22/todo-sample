import PriorityBadge from './PriorityBadge';
import DueDateDisplay from './DueDateDisplay';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className="todo-item">
      <div className="todo-item-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Toggle todo: ${todo.text}`}
          aria-checked={todo.completed}
        />
        <div className="todo-item-main">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <div className="todo-item-meta">
            {todo.priority && <PriorityBadge priority={todo.priority} />}
            {todo.dueDate && (
              <DueDateDisplay
                dueDate={todo.dueDate}
                dueTime={todo.dueTime}
                completed={todo.completed}
              />
            )}
          </div>
        </div>
      </div>
      <div className="todo-item-actions">
        <button
          className="todo-button-edit"
          onClick={() => onEdit(todo.id)}
          aria-label={`Edit: ${todo.text}`}
          title="Edit todo"
        >
          Edit
        </button>
        <button
          className="todo-button-delete"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete: ${todo.text}`}
          title="Delete todo"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

