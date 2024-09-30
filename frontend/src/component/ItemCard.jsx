import React from 'react';
import { useNavigate } from 'react-router';

const ItemCard = ({ item, onEdit, onDelete }) => {
 
 const navigate=useNavigate()
    const handleDelete=async()=>{
        try {
            await onDelete(item._id);  
        } catch (error) {
            console.error('Error handling delete:', error);     
        }
    }

   const handleEdit=async()=>{
    navigate(`/edit/${item._id}`)
   }

  const handleImageClick = (e) => {
    e.stopPropagation();
  }

  
    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-5"> {/* Increased width */}
            <img
                src={item.images[0] || "https://via.placeholder.com/400"}
                alt={item.description}
                className="w-full h-48 object-cover rounded-lg mb-4" // Keep adjusted height
            />
            <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.itemName}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-500 text-sm mb-1">{item.category}</p>
                <p className="text-gray-800 font-semibold mt-2 text-lg">${item.price}</p>
                
                <div className="flex justify-between mt-4">
                    <button
                      onClick={(e) => { handleImageClick(e); handleEdit()}}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow hover:shadow-lg"
                    >
                        Edit
                    </button>
                    <button
                          onClick={ (e) => { handleImageClick(e); handleDelete()}}
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
