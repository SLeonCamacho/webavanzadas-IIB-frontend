'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/email/${email}`);
      if (res.status === 200) {
        setError('User already registered. Please go back to the login page.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
        } else {
          setError('');
          try {
            const registerRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { name, email, password });
            if (registerRes.data) {
              router.push(`/sign-up/success?name=${encodeURIComponent(name)}`);
            }
          } catch (registrationError) {
            setError('An error occurred during registration. Please try again.');
            console.error('Error signing up:', registrationError);
          }
        }
      } else {
        setError('An error occurred. Please try again.');
        console.error('Error checking email:', error);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
          <ul>
            <li>
              <Link className="text-blue-500 hover:underline" href="/login">
                Already registered? Log in
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
