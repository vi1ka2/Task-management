import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Tasks.css';

function TasksPage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const createTask = async () => {
    if (!title.trim()) return;
    await axios.post('http://localhost:5000/tasks', { title }, { headers });
    setTitle('');
    await fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      title: task.title,
      completed: !task.completed
    }, { headers });
    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, { headers });
    await fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleSaveEdit = async (task) => {
    if (!editTitle.trim()) return;
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      title: editTitle,
      completed: task.completed
    }, { headers });
    cancelEdit();
    await fetchTasks();
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks', { headers });
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    // inline function to avoid dependency warning
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tasks', { headers });
        setTasks(res.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchData();
  }, []); // ✅ safe to leave blank

  return (
    <div className="tasks-container">
      <button className="logout" onClick={logout}>Logout</button>
      <h2>Your Tasks</h2>

      <div className="task-input">
        <input
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {editingId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task)}>💾</button>
                <button onClick={cancelEdit}>❌</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(task)}
                  className={task.completed ? 'done' : ''}
                >
                  {task.title}
                </span>
                <button onClick={() => startEdit(task)}>✏️</button>
                <button onClick={() => deleteTask(task._id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;



