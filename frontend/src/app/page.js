'use client';

import Link from 'next/link';
import Image from 'next/image';
import inventoryImage from '../../public/inventory-landing.png';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-black">InventarioPlus</h1>
        <p className="text-lg text-gray-700">Sistema de gestión de inventario integral para PYMES</p>
        <div className="flex items-center justify-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/inventory-landing.png"
            alt="InventarioPlus Logo"
            width={180}
            height={40}
            priority
          />
        </div>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" href="/sign-up">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
