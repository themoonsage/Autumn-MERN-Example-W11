import React from 'react';

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div className="task">
      <input type="checkbox" checked={todo.completed} onChange={() => onToggleCompleted(todo._id)} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
      <button onClick={() => onDeleteTodo(todo._id)}>Delete</button>
    </div>
  );
};

export default Task;
