import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null); // Track the ID of the todo being edited
  const [editText, setEditText] = useState(''); // Store the edited text temporarily
  const [error, setError] = useState(null); // State to handle server errors

  useEffect(() => {
    axios.get('http://localhost:8888/todos')
      .then(res => setTodos(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch todos');
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:8888/todos', { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText(''); // Clear the input text
      })
      .catch(err => {
        console.error(err);
        setError('Failed to add todo');
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8888/todos/${id}`)
      .then(response => {
        console.log("Delete Todo Response:", response);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error("Delete Todo Error:", error);
        setError('Failed to delete todo');
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      });
  };

  const toggleComplete = (id) => {
    const todo = todos.find(t => t._id === id);
    axios.patch(`http://localhost:8888/todos/${id}`, { completed: !todo.completed })
      .then(res => setTodos(todos.map(t => t._id === id ? res.data : t)))
      .catch(err => {
        console.error(err);
        setError('Failed to toggle todo completion');
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      });
  };

  const handleEdit = (id, text) => {
    setEditingId(id); // Set the ID of the todo being edited
    setEditText(text); // Set the text to edit
  };

  const saveEdit = (id) => {
    axios.patch(`http://localhost:8888/todos/${id}`, { text: editText })
      .then(res => {
        setTodos(todos.map(t => t._id === id ? res.data : t)); // Update the todo with edited text
        setEditingId(null); // Reset editing state
        setEditText(''); // Clear temporary edit text
      })
      .catch(err => {
        console.error(err);
        setError('Failed to save todo edit');
        setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      });
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="todo-input" 
          placeholder="Enter new todo"
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <div className="todo-input-container">
                <input 
                  type="text" 
                  value={editText}
                  className="todo-input"
                  onChange={(e) => setEditText(e.target.value)} 
                />
                <button onClick={() => saveEdit(todo._id)} className="edit-btn">Save</button>
              </div>
            ) : (
              <span className={todo.completed ? 'completed todo-item-text' : 'todo-item-text'}>
                {todo.text}
              </span>
            )}
            <span>
              <button onClick={() => toggleComplete(todo._id)} className="complete-btn">
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleEdit(todo._id, todo.text)} className="edit-btn">Edit</button>
              <button onClick={() => deleteTodo(todo._id)} className="delete-btn">Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
