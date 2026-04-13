import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div className="task">
      <Form>
        <Form.Check className="form" type="checkbox" onClick={() => onToggleCompleted(todo._id)}/>
      </Form>
      <span className="taskName" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <Button variant="light" onClick={() => onDeleteTodo(todo._id)}>Delete</Button>
    </div>
  );
};

export default Task;
