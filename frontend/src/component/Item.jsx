// components/Item.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Itemcardone from './Itemcardone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Ensure correct import

const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home', 'Sports'];
const sortOptions = [
  { value: 'lowToHigh', label: 'Price: Low to High' },
  { value: 'highToLow', label: 'Price: High to Low' },
];

const Item = () => {
  const [items, setItems] = useState([]); // Items fetched from backend
  const [category, setCategory] = useState('All'); // Selected category
  const [sortOrder, setSortOrder] = useState('lowToHigh'); // Selected sort order
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Use navigate at the top level

  // Function to fetch items from the backend with sorting and filtering
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare the request payload
      const payload = {
        category,
        sortOrder,
      };

      // Include userId if the user is logged in
      if (currentUser && currentUser._id) {
        payload.userId = currentUser._id;
      }

      // Make POST request to the new backend endpoint with the payload
      const response = await axios.post('/backend/request/default', payload);

      // Assuming the backend returns the items in response.data.data
      setItems(response.data.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      // Handle different error scenarios
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || 'Failed to fetch items.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something else happened while setting up the request
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Ensure loading is set to false after try/catch
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items when component mounts and whenever category or sortOrder changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortOrder]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const handleViewTicket = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-md mt-8 mb-8">
      {/* Dropdowns */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        {/* Category Dropdown */}
        <div className="flex-1 md:max-w-xs"> {/* Added max width for larger screens */}
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-800">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out hover:border-indigo-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="p-2">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex-1 md:max-w-xs"> {/* Added max width for larger screens */}
          <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-800">
            Sort By
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out hover:border-indigo-400"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="p-2">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Item Listing */}
      {items.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">No items found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Itemcardone 
              key={item._id} 
              item={item}
              onClick={() => handleViewTicket(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
