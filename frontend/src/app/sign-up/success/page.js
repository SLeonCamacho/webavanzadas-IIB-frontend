'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();
  const name = new URLSearchParams(router.query).get('name');

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">All set up!</h1>
        {name && <p className="text-black">We are happy to have you with us, {name}</p>}
        <br />
        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/login">
          Back to Login
        </Link>
      </div>
    </section>
  );
}
