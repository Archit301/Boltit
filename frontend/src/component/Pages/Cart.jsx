import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartUpdated, setCartUpdated] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      console.error('User is not logged in or user ID is missing.');
      return;
    }

    console.log(`Fetching cart items for user: ${currentUser._id}`);

    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/backend/item/${currentUser._id}`);
        const data = await response.json();

        console.log('Cart items data:', data);

        if (Array.isArray(data)) {
          setCartItems(
            data.map((cartItem) => ({
              _id: cartItem._id,
              itemName: cartItem.item.itemName, // Accessing item properties
              price: cartItem.item.price,
              images: cartItem.item.images || 'https://via.placeholder.com/150', // Default image if none
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
  }, [currentUser, cartUpdated]);


  const handleRemoveItem = async(id) => {
    const res= await fetch('/backend/item/deletebyId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    });
    const data = await res.json();
    console.log(data)
        setCartUpdated(!cartUpdated);
};

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
  <div className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg overflow-hidden">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Shopping Cart</h1>
    {cartItems.length === 0 ? (
      <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
    ) : (
      <div>
        {/* Cart Items List */}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <img
                src={item.images || 'https://via.placeholder.com/150'} // Fallback image
                alt={item.itemName}
                className="w-28 h-28 object-cover rounded-md mr-4 shadow"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.itemName}</h2>
                <p className="text-gray-600 text-lg">₹{item.price}</p>
              </div>
            </div>
            <button onClick={() => handleRemoveItem(item._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default Cart;
