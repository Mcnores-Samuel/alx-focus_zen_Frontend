"use client";
import { useState, useEffect } from 'react';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setError('No access token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/tasks/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);  // assuming the API returns a list of tasks
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Failed to fetch tasks');
        }
      } catch (err) {
        setError('Error connecting to the server');
      }
    };

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
