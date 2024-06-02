import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TodoList from '../components/TodoList';

jest.mock('axios');

describe('TodoList Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset all mocks
  });

  it('should fetch and display todos', async () => {
    const todos = [{ _id: '1', text: 'Test Todo', completed: false }];
    axios.get.mockResolvedValue({ data: todos });

    render(<TodoList />);

    // Wait for the todos to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('should add a new todo', async () => {
    axios.post.mockResolvedValue({ data: { _id: '2', text: 'New Todo', completed: false } });

    render(<TodoList />);

    // Input a new todo and click the add button
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter new todo'), { 
        target: { value: 'New Todo' },
      });
      fireEvent.click(screen.getByText('Add'));
    });

    // Wait for the new todo to be added and displayed
    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });
  });

  it('should delete a todo', async () => {
    const todos = [{ _id: '1', text: 'Test Todo', completed: false }];
    axios.get.mockResolvedValue({ data: todos });
    axios.delete.mockResolvedValue({});

    render(<TodoList />);

    // Wait for the todo to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Click the delete button and wait for the todo to be removed
    fireEvent.click(screen.getByText(/delete/i));
    await waitFor(() => {
      expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    });
  });

  it('should toggle todo completion', async () => {
    const todo = { _id: '1', text: 'Test Todo', completed: false };
    const updatedTodo = { ...todo, completed: true };
    axios.get.mockResolvedValue({ data: [todo] });
    axios.patch.mockResolvedValue({ data: updatedTodo });

    render(<TodoList />);

    // Wait for the todo to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Click the complete button and wait for completion
    fireEvent.click(screen.getByText(/complete/i));
    await waitFor(() => {
      expect(screen.getByText('Undo')).toBeInTheDocument();
    });
  });

  it('should edit a todo', async () => {
    const todo = { _id: '1', text: 'Test Todo', completed: false };
    axios.get.mockResolvedValue({ data: [todo] });
    axios.patch.mockResolvedValue({ data: { ...todo, text: 'Edited Todo' } });

    render(<TodoList />);

    // Wait for the todo to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Click the edit button, edit the todo, and save
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByDisplayValue('Test Todo'), { 
      target: { value: 'Edited Todo' },
    });
    fireEvent.click(screen.getByText(/save/i));

    // Wait for the todo to be updated
    await waitFor(() => {
      expect(screen.getByText('Edited Todo')).toBeInTheDocument();
    });
  });
});
