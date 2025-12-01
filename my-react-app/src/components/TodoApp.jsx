import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import FilterBar from './FilterBar';
import { useTodoReducer } from '../hooks/useTodoReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../styles/todo.css';

const STORAGE_KEY = 'my-react-app:todos:v1';

export default function TodoApp() {
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [storageReady, setStorageReady] = useState(false);

  // Load todos from localStorage on mount
  const [storedTodos, setStoredTodos] = useLocalStorage(STORAGE_KEY, []);

  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, setTodos } =
    useTodoReducer(storedTodos);

  // Initialize reducer with stored todos
  useEffect(() => {
    if (!storageReady && storedTodos.length > 0) {
      setTodos(storedTodos);
      setStorageReady(true);
    } else if (!storageReady) {
      setStorageReady(true);
    }
  }, []);

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    if (storageReady) {
      setStoredTodos(todos);
    }
  }, [todos, storageReady, setStoredTodos]);

  const handleAddTodo = (text, priority = 'medium', dueDate = '', dueTime = '') => {
    addTodo(text, priority, dueDate, dueTime);
    setEditingTodo(null);
  };

  const handleUpdateTodo = (id, text, priority = 'medium', dueDate = '', dueTime = '') => {
    editTodo(id, text, priority, dueDate, dueTime);
    setEditingTodo(null);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    setEditingTodo(todoToEdit);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    if (editingTodo?.id === id) {
      setEditingTodo(null);
    }
  };

  // Sort todos by priority
  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityA = priorityOrder[a.priority] ?? 1;
    const priorityB = priorityOrder[b.priority] ?? 1;
    return priorityA - priorityB;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>My TODO App</h1>
        <p className="todo-subtitle">Stay organized and productive</p>
      </header>

      <main className="todo-main">
        <TodoInput
          onAdd={handleAddTodo}
          onUpdate={handleUpdateTodo}
          editingTodo={editingTodo}
          onCancelEdit={handleCancelEdit}
        />

        {todos.length > 0 && (
          <>
            <FilterBar
              filter={filter}
              onChangeFilter={setFilter}
              remainingCount={remainingCount}
              completedCount={completedCount}
            />

            <TodoList
              todos={sortedTodos}
              onToggle={toggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              filter={filter}
            />
          </>
        )}
      </main>
    </div>
  );
}
