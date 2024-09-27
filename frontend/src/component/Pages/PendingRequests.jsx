import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('/api/pending-requests') // Replace with your actual API endpoint
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setPendingRequests(data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }, []);

  return (
    <ul className="space-y-6">
      {pendingRequests.map(request => (
        <li key={request.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:bg-yellow-100 transition">
          <div className="flex items-center">
            {/* Display request item image */}
            <img src={request.imageUrl} alt={request.itemName} className="w-16 h-16 rounded object-cover mr-4" />
            <div>
              <h3 className="font-semibold text-lg text-gray-700">{request.itemName}</h3>
              <p className="text-sm text-gray-500">Requested by: <span className="font-medium">{request.requester}</span></p>
              <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition">
                Approve Request
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PendingRequests;
