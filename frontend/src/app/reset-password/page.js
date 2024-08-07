// src/app/reset-password/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const email = localStorage.getItem('resetEmail'); // Obtener el email del localStorage

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            console.log('email es este hhhh:', email);
            console.log('newPassword:', newPassword);
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`, {
                email: email,
                newPassword: newPassword,
            });
            router.push('/reset-password/success');
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4 text-black">Reset Password</h1>
                <form onSubmit={handleResetPassword} className="flex flex-col space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    {errorMessage && <p className="error" style={{ color: 'red' }}>{errorMessage}</p>}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </section>
    );
}
