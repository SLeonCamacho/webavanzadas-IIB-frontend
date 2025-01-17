// src/app/reset-password/success.js
'use client';

import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Success() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-black">Your password has been successfully reset!</h1>
            <div className="flex items-center justify-center">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                src="/green-check.png"
                alt="Green checkmark icon"
                width={180}
                height={40}
                priority
              />
            </div>
            <br />
            <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/login">
              Back to Login
            </Link>
          </div>
        </section>
      );
}
