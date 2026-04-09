import React from 'react';
import Task from './Task';

const TaskList = ({ todos, onToggleCompleted, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Task key={todo._id} todo={todo} onToggleCompleted={onToggleCompleted} onDeleteTodo={onDeleteTodo} />
      ))}
    </ul>
  );
};

export default TaskList;
