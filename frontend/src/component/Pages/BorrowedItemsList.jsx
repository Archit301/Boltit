import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowedItemsList = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('/api/borrowed-items') // Replace with your actual API endpoint
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setBorrowedItems(data);
      })
      .catch(error => {
        console.error('Error fetching borrowed items:', error);
      });
  }, []);

  return (
    <ul className="space-y-6">
      {borrowedItems.map(item => (
        <li key={item.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
          <div className="flex items-center">
            {/* Display item image */}
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
            <div>
              <h3 className="font-semibold text-lg text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">Due Date: <span className="font-medium">{item.dueDate}</span></p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Return Item
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BorrowedItemsList;
