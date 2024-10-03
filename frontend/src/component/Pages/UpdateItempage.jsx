import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { app } from '../../firebase';
import { useParams } from 'react-router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const UpdateItempage = () => {
    const { itemId } = useParams();
    
    const initialFormData = {
        itemName: "",
        category: "",
        description: "",
        price: "",
        images: [],
        condition: "",
        fromDate: "",
        toDate: ""
    };

    const [formData, setFormData] = useState(initialFormData); 
    const { currentUser } = useSelector((state) => state.user);
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('/backend/item/edititem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: itemId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                // Ensure all fields are present, providing default values if necessary
                setFormData({
                    itemName: data[0].itemName || "",
                    category: data[0].category || "",
                    description: data[0].description || "",
                    price: data[0].price || "",
                    images: data[0].images || [],
                    condition: data[0].condition || "",
                    fromDate: data.fromDate ? data[0].fromDate.split('T')[0] : "",
                    toDate: data.toDate ? data[0].toDate.split('T')[0] : ""
                });
            } catch (error) {
                console.error('Error fetching item details:', error);
                setError('Failed to fetch item details. Please try again later.');
            }
        };
        fetchDetails();
    }, [itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        if (selectedFiles.length > 0 && (selectedFiles.length + formData.images.length) <= 6) {
            setUploading(true);
            const uploadPromises = selectedFiles.map(file => storeImage(file));
            
            Promise.all(uploadPromises)
                .then((urls) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        images: [...prevData.images, ...urls]
                    }));
                    setUploading(false);
                    setImageUploadError('');
                })
                .catch((err) => {
                    console.error('Image upload failed:', err);
                    setUploading(false);
                    setImageUploadError('Image upload failed (2 MB max per image)');
                });
        } else {
            setImageUploadError('You can only upload up to 6 images per listing');
        }
    };

    const storeImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = `${new Date().getTime()}_${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Add form submission logic here
        try {
            const response = await fetch('/backend/item/updateitem', { // Assuming this is the endpoint
                method: 'POST', // Use appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: itemId, ...formData })
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            const result = await response.json();
            Toastify({
                text: "Item Updated successfully!",
                duration: 3000, // Duration in milliseconds
                gravity: "top", // 'top' or 'bottom'
                position: 'center', // 'left', 'center', or 'right'
                backgroundColor: "blue", // Background color of the toast
                className: "info", // Optional class for custom styling
                close: true, // Show close button
                onClick: function() {} // Callback after click
              }).showToast();
            console.log('Item updated successfully:', result);
            // Redirect or provide success feedback
        } catch (err) {
            console.error('Error updating item:', err);
            setError('Failed to update item. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Item</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                            <option value="" disabled>Select a category</option>
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
                            min="0"
                            step="0.01"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {uploading && <p className="text-sm text-gray-500">Uploading images...</p>}
                        {imageUploadError && <p className="text-sm text-red-500">{imageUploadError}</p>}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formData.images.map((url, index) => (
                                <img key={index} src={url} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded" />
                            ))}
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <textarea
                            name="condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Condition of the item"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* From Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">From Date</label>
                        <input
                            type="date"
                            name="fromDate"
                            value={formData.fromDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* To Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">To Date</label>
                        <input
                            type="date"
                            name="toDate"
                            value={formData.toDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Update Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItempage;
