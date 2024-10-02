import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add refresh state
  const { currentUser } = useSelector((state) => state.user);

  // Fetch data from backend
  useEffect(() => {
    const pendinglist = async () => {
      try {
        const res = await fetch(`/backend/request/pending/${currentUser._id}`);
        const data = await res.json();
        setPendingRequests(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    pendinglist();
  }, [refresh]); // Depend on refresh to re-run useEffect

  const RequestDateComponent = ({ requestDate }) => {
    const date = new Date(requestDate);
    let formattedDate;
    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString(); // Format date
    } else {
      formattedDate = 'Invalid date';
    }
    return <span className="font-medium">{formattedDate}</span>;
  };

  const acceptRequest = async (id) => {
    try {
      const res = await fetch(`/backend/request/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the request ID as an object
      });
      const data = await res.json();
      console.log(data);
      setRefresh(!refresh); // Toggle refresh to trigger useEffect
    } catch (error) {
      console.log(error);
    }
  };

  const declineRequest = async (id) => {
    try {
      const res = await fetch(`/backend/request/decline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the request ID as an object
      });
      const data = await res.json();
      console.log(data);
      setRefresh(!refresh); // Toggle refresh to trigger useEffect
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="space-y-6">
      {pendingRequests.map((request) => (
        <li key={request._id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 hover:bg-yellow-100 transition">
          <div className="flex items-center">
            {/* Display request item image */}
            <img
              src={request.itemId.images[0]}
              alt={request.itemId.itemName}
              className="w-16 h-16 rounded object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-700">
                Item Name: {request.itemId.itemName}
              </h3>
              <p className="text-sm text-gray-500">
                Requested by: <span className="font-medium">{request.borrowerId.username}</span>
              </p>
              <p className="text-sm text-gray-500">
                Date: <RequestDateComponent requestDate={request.requestDate} />
              </p>

              {/* Buttons container for mobile */}
              <div className="flex space-x-2 mt-4 md:hidden">
                <button
                  onClick={() => acceptRequest(request._id)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
                >
                  Approve Request
                </button>
                <button
                  onClick={() => declineRequest(request._id)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
                >
                  Decline Request
                </button>
              </div>

              {/* Buttons for larger screens */}
              <div className="hidden md:flex space-x-2 mt-4">
                <button
                  onClick={() => acceptRequest(request._id)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
                >
                  Approve Request
                </button>
                <button
                  onClick={() => declineRequest(request._id)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
                >
                  Decline Request
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PendingRequests;
