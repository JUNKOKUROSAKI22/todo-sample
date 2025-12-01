import { describe, it, expect } from 'vitest';
import { useTodoReducer } from '../hooks/useTodoReducer';
import { renderHook, act } from '@testing-library/react';

describe('useTodoReducer', () => {
  it('should initialize with empty array', () => {
    const { result } = renderHook(() => useTodoReducer([]));
    expect(result.current.todos).toEqual([]);
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodoReducer([]));

    act(() => {
      result.current.addTodo('Learn React');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Learn React');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should toggle a todo completion status', () => {
    const initialTodos = [
      { id: '1', text: 'Test todo', completed: false, createdAt: Date.now() },
    ];
    const { result } = renderHook(() => useTodoReducer(initialTodos));

    act(() => {
      result.current.toggleTodo('1');
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo('1');
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    const initialTodos = [
      { id: '1', text: 'Todo 1', completed: false, createdAt: Date.now() },
      { id: '2', text: 'Todo 2', completed: false, createdAt: Date.now() },
    ];
    const { result } = renderHook(() => useTodoReducer(initialTodos));

    act(() => {
      result.current.deleteTodo('1');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe('2');
  });

  it('should edit a todo', () => {
    const initialTodos = [
      { id: '1', text: 'Original text', completed: false, createdAt: Date.now() },
    ];
    const { result } = renderHook(() => useTodoReducer(initialTodos));

    act(() => {
      result.current.editTodo('1', 'Updated text');
    });

    expect(result.current.todos[0].text).toBe('Updated text');
  });

  it('should set todos from external source', () => {
    const { result } = renderHook(() => useTodoReducer([]));
    const newTodos = [
      { id: '1', text: 'First', completed: false, createdAt: Date.now() },
      { id: '2', text: 'Second', completed: true, createdAt: Date.now() },
    ];

    act(() => {
      result.current.setTodos(newTodos);
    });

    expect(result.current.todos).toEqual(newTodos);
  });

  it('should clear completed todos', () => {
    const initialTodos = [
      { id: '1', text: 'Done', completed: true, createdAt: Date.now() },
      { id: '2', text: 'Not done', completed: false, createdAt: Date.now() },
    ];
    const { result } = renderHook(() => useTodoReducer(initialTodos));

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe('2');
  });
});
