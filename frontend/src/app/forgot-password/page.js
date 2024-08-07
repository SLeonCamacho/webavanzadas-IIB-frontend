'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/email/${email}`);
            if (res.data.email) {
                localStorage.setItem('resetEmail', email);
                router.push('/reset-password');
            } else {
                setErrorMessage('User not registered');
            }
        } catch (error) {
            setErrorMessage('User not registered');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4 text-black">Forgot Password</h1>
                <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Send
                    </button>
                    {errorMessage && <p className="error" style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
            <div className="text-center">
                <ul className="space-y-4">
                    <li>
                        <Link className="text-blue-500 hover:underline" href="/login">
                            Back to Login
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}
