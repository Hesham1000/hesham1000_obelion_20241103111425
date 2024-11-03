import React, { useState } from 'react';
import './TaskForm.css';
import axios from 'axios';

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/tasks', {
        title,
        description,
        dueDate,
        priority
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      onCreate(response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority Level</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Add Task</button>
    </form>
  );
}

export default TaskForm;
