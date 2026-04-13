import React, { useState, useEffect } from 'react';
import './bootstrap.min.css'
import './App.css';
import Task from './components/Task';
import TaskList from './components/TaskList';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const backendUrl =  'http://localhost:5050/api/todos'; 

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(backendUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return; // Prevent adding empty todos

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Add new todo to state
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      const updatedTodo = { ...todos.find((todo) => todo._id === id) };
      updatedTodo.completed = !updatedTodo.completed;

      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <div className="App-Container">
        <Form>
          <Form.Group className="input"></Form.Group>
          <Form.Label column="lg">Todo List</Form.Label>
          <Form.Control value={newTodoText} onChange={handleInputChange} placeholder="add task here"></Form.Control>
        </Form>
        <Button size="lg" variant="primary" onClick={handleAddTodo}>Add Todo</Button>
      </div>
        <TaskList todos={todos} onToggleCompleted={handleToggleCompleted} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default App;
