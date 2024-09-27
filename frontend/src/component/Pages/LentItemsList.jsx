import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LentItemsList = () => {
  const [lentItems, setLentItems] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('/api/lent-items') // Replace with your actual API endpoint
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setLentItems(data);
      })
      .catch(error => {
        console.error('Error fetching lent items:', error);
      });
  }, []);

  return (
    <ul className="space-y-6">
      {lentItems.map(item => (
        <li key={item.id} className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition">
          <div className="flex items-center">
            {/* Display item image */}
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
            <div>
              <h3 className="font-semibold text-lg text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">Return Date: <span className="font-medium">{item.returnDate}</span></p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                Mark as Returned
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LentItemsList;
