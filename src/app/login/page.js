"use client";
import { useState } from 'react';
import { authStatus } from '../middleware/authStatus';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const currentAccessToken = authStatus();
  if (currentAccessToken) {
    return redirect('/dashboard');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://alx-focus-zen-backend.vercel.app/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setError(null);

    } catch (err) {
      console.error('Error connecting to the server:', err);
      setError('Error connecting to the server');
    }
  };

  return (
    <div className='w-full max-w-xs'>
      <h1 className=''>Login</h1>
      <form onSubmit={handleLogin} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div class="mb-6">
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </label>
        </div>
        <div class="mb-6">
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </label>
        </div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}