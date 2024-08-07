'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InventoryTable from '../components/InventoryTable';
import TabsInventory from '../components/TabsInventory';
import Image from 'next/image';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [averageQuantity, setAverageQuantity] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserName(response.data.name);
          setUserID(response.data.id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [router]);

  useEffect(() => {
    if (userID) {
      const fetchInventoryData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/user/${userID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setInventoryData(response.data);
          setTotalProducts(response.data.length);
          setAverageQuantity(response.data.reduce((acc, item) => acc + item.quantity, 0) / response.data.length);
          setAveragePrice(response.data.reduce((acc, item) => acc + item.price, 0) / response.data.length);
        } catch (error) {
          console.error('Error fetching inventory data:', error);
        }
      };
      fetchInventoryData();
    }
  }, [userID]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-4">Welcome, {userName}</p>
        <div className="flex items-center justify-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/person-hand-wave.jpg"
            alt="Persona saludando"
            width={180}
            height={40}
            priority
          />
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700">Logout</button>
        <p className="text-lg text-gray-700 mb-4">Here you can see data, perform CRUD operations and chat with other users.</p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="px-4 py-2 bg-blue-100 rounded-full">
            <p className="text-black">Total Products: {totalProducts}</p>
          </div>
          <div className="px-4 py-2 bg-green-100 rounded-full">
            <p className="text-black">Average Quantity: {averageQuantity.toFixed(2)}</p>
          </div>
          <div className="px-4 py-2 bg-yellow-100 rounded-full">
            <p className="text-black">Average Price: {averagePrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-black">
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Inventory</h2>
            <InventoryTable data={inventoryData} />
            <TabsInventory userID={userID} setInventoryData={setInventoryData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

