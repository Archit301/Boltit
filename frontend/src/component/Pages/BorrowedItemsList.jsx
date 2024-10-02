import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BorrowedItemsList = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const pendinglist=async()=>{
      try {
        const res=await fetch(`/backend/request/borrowed/${currentUser._id}`)
        const data=await res.json()
        setBorrowedItems(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      }
      pendinglist();
  }, [refresh]);

  const Request = async (id) => {
    try {
      const res = await fetch(`/backend/request/request`, {
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


  const RequestDateComponent = ({ requestDate }) => {
    const date = new Date(requestDate);
  
    // Check if the date conversion is valid
    let formattedDate;
    if (!isNaN(date.getTime())) {
      // Use toLocaleTimeString for local time format
      formattedDate = date.toLocaleDateString(); // e.g., "1:00 PM"
    } else {
      formattedDate = 'Invalid date'; // Handle invalid date case
    }
  
    return <span className="font-medium">{formattedDate}</span>;
  };

  return (
    <ul className="space-y-6">
      {borrowedItems.map(item => (
        <li key={item._id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition">
          <div className="flex items-center">
            {/* Display item image */}
            <img src={item.itemId.images[0]} alt={item.itemId.itemName} className="w-16 h-16 rounded object-cover mr-4" />
            <div>
              <h3 className="font-semibold text-lg text-gray-700">{item.itemId.itemName}</h3>
              <p className="text-sm text-gray-500">Due Date: <span className="font-medium"><RequestDateComponent requestDate={item.itemId.toDate} /></span></p>
              <button  onClick={() => Request(item._id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
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
