import { useReducer } from 'react';

/**
 * Todo reducer actions:
 * - ADD_TODO: { type: 'ADD_TODO', payload: { text, priority, dueDate, dueTime } }
 * - TOGGLE_TODO: { type: 'TOGGLE_TODO', payload: { id } }
 * - DELETE_TODO: { type: 'DELETE_TODO', payload: { id } }
 * - EDIT_TODO: { type: 'EDIT_TODO', payload: { id, text, priority, dueDate, dueTime } }
 * - SET_TODOS: { type: 'SET_TODOS', payload: { todos } }
 */

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: Date.now().toString(),
        text: action.payload.text,
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || '',
        dueTime: action.payload.dueTime || '',
        completed: false,
        createdAt: Date.now(),
      };
      return [...state, newTodo];
    }

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);

    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              priority: action.payload.priority || todo.priority,
              dueDate: action.payload.dueDate ?? todo.dueDate,
              dueTime: action.payload.dueTime ?? todo.dueTime,
            }
          : todo
      );

    case 'SET_TODOS':
      return action.payload.todos;

    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}

export function useTodoReducer(initialTodos = []) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const addTodo = (text, priority = 'medium', dueDate = '', dueTime = '') =>
    dispatch({ type: 'ADD_TODO', payload: { text, priority, dueDate, dueTime } });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: { id } });
  const editTodo = (id, text, priority = 'medium', dueDate = '', dueTime = '') =>
    dispatch({ type: 'EDIT_TODO', payload: { id, text, priority, dueDate, dueTime } });
  const setTodos = (todos) => dispatch({ type: 'SET_TODOS', payload: { todos } });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setTodos,
    clearCompleted,
  };
}
