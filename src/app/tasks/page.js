"use client";
import { useState, useEffect } from 'react';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch('https://alx-focus-zen-backend.vercel.app/api/v1/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: localStorage.getItem('refreshToken'),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to refresh access token');
        return null;
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      setError(null);
      return data.access;
    } catch (err) {
      console.error('Error connecting to the server:', err);
      setError('Error connecting to the server');
      return null;
    }
  };

  const fetchTasks = async () => {
    let accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      setError('No access token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://alx-focus-zen-backend.vercel.app/api/v1/tasks/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);  // assuming the API returns a list of tasks
      } else if (response.status === 401) {
        // Token might be expired, try refreshing it
        accessToken = await refreshAccessToken();
        if (accessToken) {
          // Retry fetching tasks with the new token
          await fetchTasks();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}: {task.status}</li>
        ))}
      </ul>
    </div>
  );
}
