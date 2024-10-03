import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const LentItemRequest = () => {
    const [lentItems, setLentItems] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const pendinglist=async()=>{
          try {
            const res=await fetch(`/backend/request/lentitemrequest/${currentUser._id}`)
            const data=await res.json()
            setLentItems(data)
            console.log(data)
          } catch (error) {
            console.log(error)
          }
          }
          pendinglist();
      }, [refresh]);

      const checkRequest = async (id) => {
        try {
          const res = await fetch(`/backend/request/checkrequest`, {
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
    {lentItems.map(item => (
      <li key={item._id} className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition">
        <div className="flex items-center">
          {/* Display item image */}
          <img src={item.itemId.images[0]} alt={item.itemId.itemName} className="w-16 h-16 rounded object-cover mr-4" />
          <div>
            <h3 className="font-semibold text-lg text-gray-700">{item.itemId.itemName}</h3>
            <p className="text-sm text-gray-500">Return Date: <span className="font-medium"><RequestDateComponent requestDate={item.itemId.toDate} /></span></p>
            <button  onClick={() => checkRequest(item._id)}
             className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
              Mark as Returned
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
  )
}

export default LentItemRequest
