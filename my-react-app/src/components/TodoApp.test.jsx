import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from '../components/TodoApp';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('TodoApp Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the app header', () => {
    render(<TodoApp />);
    expect(screen.getByRole('heading', { name: /My TODO App/i })).toBeInTheDocument();
  });

  it('should render the input form', () => {
    render(<TodoApp />);
    expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('should add a todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    await user.type(input, 'New test todo');
    await user.click(addButton);

    expect(screen.getByText('New test todo')).toBeInTheDocument();
  });

  it('should toggle todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Test todo');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    const checkbox = screen.getByRole('checkbox', { name: /Toggle todo: Test todo/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should delete a todo', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);
    await user.type(input, 'Todo to delete');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.getByText('Todo to delete')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /Delete: Todo to delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument();
  });

  it('should filter todos by viewing completed filter', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);

    // Add a todo
    await user.type(input, 'Test todo');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    // Verify todo exists
    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });

    // Complete the todo
    const checkbox = screen.getByRole('checkbox', { name: /Toggle todo: Test todo/i });
    await user.click(checkbox);

    // Verify it's marked as completed
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    // Find and click Completed filter button
    const allButtons = screen.getAllByRole('button');
    const completedButton = allButtons.find((btn) => btn.textContent === 'Completed');
    await user.click(completedButton);

    // Verify the completed todo is still visible
    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument();
    });
  });

  it('should show stats', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/Add a new todo/i);

    // Add and complete a todo
    await user.type(input, 'Completed todo');
    await user.click(screen.getByRole('button', { name: /Add/i }));
    await user.click(screen.getByRole('checkbox'));

    // Add an active todo
    await user.type(input, 'Active todo');
    await user.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.getByText(/1 active/)).toBeInTheDocument();
    expect(screen.getByText(/1 completed/)).toBeInTheDocument();
  });
});
