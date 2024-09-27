import React from "react";

const ItemDetailPage = () => {
  const item = {
    name: "MacBook Pro",
    category: "Electronics",
    description:
      "The MacBook Pro is a high-performance laptop with a 13-inch Retina display, Apple’s latest M1 chip, and 16GB of RAM, making it perfect for professionals.",
    price: "1999",
    image: "/path-to-your-image.jpg", // Use the correct path for the image
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-6xl w-full p-6 bg-white shadow-md rounded-lg">
        {/* Image & Details Section */}
        <div className="lg:flex lg:space-x-6">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
            <p className="text-sm text-gray-500 mb-4">
              Category: <span className="font-semibold">{item.category}</span>
            </p>
            <p className="text-lg text-gray-700 mb-6">{item.description}</p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">${item.price}</p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add to Cart
              </button>
              <button className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Save for Later
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Specifications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Display: 13-inch Retina</li>
            <li>Processor: Apple M1 chip</li>
            <li>RAM: 16GB</li>
            <li>Storage: 512GB SSD</li>
            <li>Battery Life: Up to 20 hours</li>
            <li>Operating System: macOS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
