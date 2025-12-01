import { useState, useRef, useEffect } from 'react';

export default function TodoInput({ onAdd, onUpdate, editingTodo, onCancelEdit }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text);
      setPriority(editingTodo.priority || 'medium');
      setDueDate(editingTodo.dueDate || '');
      setDueTime(editingTodo.dueTime || '');
      setShowAdvanced(!!editingTodo.dueDate);
      inputRef.current?.focus();
    } else {
      setInputValue('');
      setPriority('medium');
      setDueDate('');
      setDueTime('');
      setShowAdvanced(false);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      alert('Please enter a todo');
      return;
    }

    if (editingTodo) {
      onUpdate(editingTodo.id, trimmed, priority, dueDate, dueTime);
    } else {
      onAdd(trimmed, priority, dueDate, dueTime);
    }

    setInputValue('');
    setPriority('medium');
    setDueDate('');
    setDueTime('');
    setShowAdvanced(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && editingTodo) {
      onCancelEdit();
      setInputValue('');
    }
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="todo-input-main">
        <input
          ref={inputRef}
          type="text"
          className="todo-input"
          placeholder={editingTodo ? 'Edit todo...' : 'Add a new todo...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={editingTodo ? 'Edit todo' : 'Add new todo'}
        />
        <button
          type="button"
          className="todo-button-toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-label="Toggle advanced options"
          title="Priority and due date"
        >
          ⚙️
        </button>
        <button
          type="submit"
          className="todo-button-submit"
          aria-label={editingTodo ? 'Update todo' : 'Add todo'}
        >
          {editingTodo ? 'Update' : 'Add'}
        </button>
        {editingTodo && (
          <button
            type="button"
            className="todo-button-cancel"
            onClick={() => {
              onCancelEdit();
              setInputValue('');
            }}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        )}
      </div>

      {showAdvanced && (
        <div className="todo-input-advanced">
          <div className="form-group">
            <label htmlFor="priority-select">Priority:</label>
            <select
              id="priority-select"
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="due-date-input">Due Date:</label>
            <input
              id="due-date-input"
              type="date"
              className="due-date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="due-time-input">Due Time:</label>
            <input
              id="due-time-input"
              type="time"
              className="due-time-input"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              disabled={!dueDate}
            />
          </div>
        </div>
      )}
    </form>
  );
}
