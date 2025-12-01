import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { renderHook, act } from '@testing-library/react';

describe('useLocalStorage', () => {
  const testKey = 'test-key-' + Date.now();

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.removeItem(testKey);
  });

  it('should initialize with initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should read value from localStorage', () => {
    const value = { todos: ['test'] };
    localStorage.setItem(testKey, JSON.stringify(value));

    const { result } = renderHook(() => useLocalStorage(testKey, {}));
    expect(result.current[0]).toEqual(value);
  });

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem(testKey))).toBe('updated');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(JSON.parse(localStorage.getItem(testKey))).toBe(1);
  });
});
