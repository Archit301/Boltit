import React from 'react';

const ItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-5"> {/* Increased width */}
            <img
                src={item.images[0] || "https://via.placeholder.com/400"}
                alt={item.description}
                className="w-full h-56 object-cover rounded-lg mb-4" // Reduced height for better visibility
            />
            <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.itemName}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-500 text-sm mb-1">{item.category}</p>
                <p className="text-gray-800 font-semibold mt-2 text-lg">${item.price}</p> {/* Fixed to 2 decimal places */}
                
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onEdit}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 shadow hover:shadow-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
