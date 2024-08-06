import Link from 'next/link';
import Image from 'next/image';
import landingImage from '../public/image.png'; // Usa la imagen que subiste

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">InventarioPlus</h1>
      <p className="text-lg mb-8">Sistema de gestión de inventario integral para PYMES</p>
      <Image src={landingImage} alt="Warehouse" width={500} height={300} />
      <div className="flex space-x-4 mt-8">
        <Link href="/login">
          <a className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
        </Link>
        <Link href="/signup">
          <a className="px-4 py-2 bg-green-500 text-white rounded">SignUp</a>
        </Link>
      </div>
    </div>
  );
}
