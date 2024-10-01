import React from 'react'
import { useNavigate } from 'react-router';

const Itemcardone = ({item,onClick}) => {
  const navigate=useNavigate()
  const handleViewTicket = (itemId) => {
    navigate(`/detail/${itemId}`);
  };
  return (
    <div onClick={() => handleViewTicket(item._id)}
     className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-5 hover:shadow-2xl">
    {/* Image */}
    <img
      src={item.images[0] || "https://via.placeholder.com/400"}
      alt={item.description}
      className="w-full h-48 object-cover rounded-lg mb-4 transition-transform transform hover:scale-105"
    />
    
    {/* Item Details */}
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition duration-200">{item.itemName}</h2>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p className="text-gray-500 text-sm mb-1 italic">{item.category}</p>
      <p className="text-gray-800 font-semibold mt-2 text-lg">${item.price}</p>
    </div>
  </div>
  
  )
}

export default Itemcardone
