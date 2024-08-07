'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      } else {
        setMessage('User not registered or incorrect password.');
      }
    } catch (error) {
      setMessage('User not registered or incorrect password.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {message && <p className="message" style={{ color: 'red' }}>{message}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-center">
        <ul className="space-y-4">
          <li>
            <Link className="text-blue-500 hover:underline" href="/forgot-password">
              Forgot Password?
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/sign-up">
              Not registered yet?
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
