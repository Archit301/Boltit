import React, { useState } from 'react'

const AddItemPage = () => {
    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0],
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add form submission logic here
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter item name"
                  required
                />
              </div>
    
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                  <option value="furniture">Furniture</option>
                  <option value="others">Others</option>
                </select>
              </div>
    
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the item"
                  rows="4"
                  required
                ></textarea>
              </div>
    
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price"
                  required
                />
              </div>
    
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
    
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default AddItemPage
