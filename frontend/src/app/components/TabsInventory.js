'use client';

import React, { useState } from 'react';
import axios from 'axios';

const TabsInventory = ({ userID, setInventoryData, fetchInventoryData }) => {
    const [activeTab, setActiveTab] = useState('create');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [updateProductID, setUpdateProductID] = useState('');
    const [updateProductName, setUpdateProductName] = useState('');
    const [updateQuantity, setUpdateQuantity] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [deleteProductID, setDeleteProductID] = useState('');

    const clearCreateInputs = () => {
        setProductName('');
        setQuantity('');
        setPrice('');
    };

    const clearReadInputs = () => {
        setSearchTerm('');
    };

    const clearUpdateInputs = () => {
        setUpdateProductID('');
        setUpdateProductName('');
        setUpdateQuantity('');
        setUpdatePrice('');
    };

    const clearDeleteInputs = () => {
        setDeleteProductID('');
    };


    const handleCreate = async (e) => {
        e.preventDefault();
        if (isNaN(quantity) || isNaN(price)) {
            alert("Quantity and Price must be valid numbers");
            return;
        }
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/create`, {
                product_name: productName,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                user_id: userID
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchInventoryData();
            clearCreateInputs();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleRead = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/search/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setInventoryData(response.data);
            clearReadInputs();
        } catch (error) {
            console.error('Error searching product:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isNaN(updateQuantity) || isNaN(updatePrice)) {
            alert("Quantity and Price must be valid numbers");
            return;
        }
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/inventory/update`, {
                id: updateProductID,
                product_name: updateProductName,
                quantity: parseInt(updateQuantity),
                price: parseFloat(updatePrice)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchInventoryData();
            clearUpdateInputs();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (isNaN(deleteProductID)) {
            alert("Product ID must be a valid number");
            return;
        }
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/inventory/delete/${deleteProductID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchInventoryData();
            clearDeleteInputs();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <ul className="flex justify-center space-x-4 mb-4">
                <li className={activeTab === 'create' ? 'font-bold' : ''} onClick={() => setActiveTab('create')}>Create</li>
                <li className={activeTab === 'read' ? 'font-bold' : ''} onClick={() => setActiveTab('read')}>Read</li>
                <li className={activeTab === 'update' ? 'font-bold' : ''} onClick={() => setActiveTab('update')}>Update</li>
                <li className={activeTab === 'delete' ? 'font-bold' : ''} onClick={() => setActiveTab('delete')}>Delete</li>
            </ul>
            {activeTab === 'create' && (
                <form onSubmit={handleCreate} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => {
                            if (/^\d*$/.test(e.target.value)) {
                                setQuantity(e.target.value);
                            }
                        }}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => {
                            if (/^\d*\.?\d*$/.test(e.target.value)) {
                                setPrice(e.target.value);
                            }
                        }}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Create
                    </button>
                </form>
            )}
            {activeTab === 'read' && (
                <form onSubmit={handleRead} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Search by Product Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Search
                    </button>
                </form>
            )}
            {activeTab === 'update' && (
                <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
                    <input
                        type="number"
                        placeholder="Product ID"
                        value={updateProductID}
                        onChange={(e) => setUpdateProductID(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Product Name"
                        value={updateProductName}
                        onChange={(e) => setUpdateProductName(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="number"
                        placeholder="New Quantity"
                        value={updateQuantity}
                        onChange={(e) => {
                            if (/^\d*$/.test(e.target.value)) {
                                setUpdateQuantity(e.target.value);
                            }
                        }}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="number"
                        placeholder="New Price"
                        value={updatePrice}
                        onChange={(e) => {
                            if (/^\d*\.?\d*$/.test(e.target.value)) {
                                setUpdatePrice(e.target.value);
                            }
                        }}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Update
                    </button>
                </form>
            )}
            {activeTab === 'delete' && (
                <form onSubmit={handleDelete} className="flex flex-col space-y-4">
                    <input
                        type="number"
                        placeholder="Product ID"
                        value={deleteProductID}
                        onChange={(e) => setDeleteProductID(e.target.value)}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                        Delete
                    </button>
                </form>
            )}
        </div>
    );
};

export default TabsInventory;
