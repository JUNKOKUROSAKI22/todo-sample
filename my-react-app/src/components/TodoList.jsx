import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  filter,
}) {
  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="todo-empty-state" role="status" aria-live="polite">
        <p>No todos {filter !== 'all' ? `in ${filter} filter` : 'yet'}.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
