import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
];

const itemsData = {
  1: [
    { id: 1, name: 'Laptop', description: 'High performance laptop', price: 999 },
    { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 799 },
  ],
  2: [
    { id: 3, name: 'T-shirt', description: '100% cotton t-shirt', price: 29 },
    { id: 4, name: 'Jeans', description: 'Stylish denim jeans', price: 49 },
  ],
  3: [
    { id: 5, name: 'JavaScript Book', description: 'Learn JavaScript', price: 39 },
    { id: 6, name: 'CSS Book', description: 'Master CSS techniques', price: 29 },
  ],
};

function ItemPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [items, setItems] = useState(itemsData[selectedCategory]);
  const navigate=useNavigate()

  const handleCategoryChange = (event) => {
    const categoryId = Number(event.target.value);
    setSelectedCategory(categoryId);
    setItems(itemsData[categoryId]);
  };

  const handleAddItem = () => {
    navigate('/additem')
  };

  return (
    <div className="flex flex-col items-center justify-start p-5  bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Items</h1>
      
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md mx-auto">
        {/* Top Section: Add Item Button and Category Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* Add Item Button */}
          <button
            onClick={handleAddItem}
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
          >
            Add Item
          </button>

          {/* Category Dropdown */}
          <div className="w-full md:w-auto">
            <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-60 py-2 px-4 rounded-lg border border-gray-300 text-gray-800 font-medium focus:border-blue-700 focus:outline-none transition duration-300"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <span className="text-lg font-semibold text-gray-800">${item.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-64 bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                  No items available in this category.
                </p>
                <p className="text-gray-500">
                  It looks like there are no items matching your filter criteria at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
