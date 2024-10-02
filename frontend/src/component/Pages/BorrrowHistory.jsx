import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BorrowHistory = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      console.error('User is not logged in or user ID is missing.');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/backend/request/borrow/${currentUser._id}`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Cart items data:', data);

        if (Array.isArray(data)) {
          setCartItems(
            data.map((cartItem) => ({
              _id: cartItem._id,
              itemName: cartItem.item?.itemName || 'Unknown Item', // Handle undefined itemName
              price: cartItem.item?.price || 0, // Handle undefined price
              images: cartItem.item?.images[0] || 'https://via.placeholder.com/150', // Default image
            }))
          );
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Borrowed History</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your history is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <img
                    src={item.images} // Ensure the first image is displayed or fallback
                    alt={item.itemName}
                    className="w-28 h-28 object-cover rounded-md mr-4 shadow"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.itemName}</h2>
                    <p className="text-gray-600 text-lg">₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowHistory;
