import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ItemCard from './ItemCard';
import { useSelector } from 'react-redux';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
];

function ItemPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const listing = async () => {
    try {
      const res = await fetch(`/backend/item/list/${currentUser._id}`);
      const data = await res.json();
      console.log(data);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      listing();
    }
  }, [currentUser]);

  const handleCategoryChange = (event) => {
    const categoryId = Number(event.target.value);
    setSelectedCategory(categoryId);
    // Assuming itemsData is a pre-fetched list of items by category
    setItems(itemsData[categoryId]);
  };

  const handleAddItem = () => {
    navigate('/additem');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/backend/item/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Re-fetch the updated items list after deletion
        listing();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewTicket = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <div className="flex flex-col items-center justify-start p-5 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Items</h1>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md mx-auto">
        {/* Top Section: Add Item Button and Category Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* Add Item Button */}
          {currentUser  ?
          (<button
            onClick={handleAddItem}
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
          >
            Add Item
          </button>):('')
}
          {/* Category Dropdown */}
          {/* <div className="w-full md:w-auto">
            <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-60 py-2 px-4 rounded-lg border border-gray-300 text-gray-800 font-medium focus:border-blue-700 focus:outline-none transition duration-300"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        {/* Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={() => handleEdit(item._id)}
                onDelete={() => handleDelete(item._id)}
                onClick={() => handleViewTicket(item._id)}
              />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-64 bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                  No items available in this category.
                </p>
                <p className="text-gray-500">It looks like there are no items matching your filter criteria at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
