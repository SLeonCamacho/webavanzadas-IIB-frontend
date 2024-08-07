'use client';

import Link from 'next/link';
import Image from 'next/image';
import inventoryImage from '../../public/inventory-landing.png';

export default function Home() {
  return (
    <div className="container">
      <h1>InventarioPlus</h1>
      <p>Sistema de gestión de inventario integral para PYMES</p>
      <Image src={inventoryImage} alt="Inventory" width={300} height={200} />
      <div>
        <Link href="/login"><button>Login</button></Link>
        <Link href="/signup"><button>SignUp</button></Link>
      </div>
    </div>
  );
}
