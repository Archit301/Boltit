import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
const AddItemPage = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        description: "",
        price: "",
        images: [], // This should be where the uploaded images are stored
        condition: "",
        fromDate: "",
        toDate: "",
    });   
    const [error, seterror] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);  
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.images.length < 7) { // Use formData.images instead of coverImage
            setUploading(true);
            const promise = [];
            for (let i = 0; i < files.length; i++) {
                promise.push(storeImage(files[i]));
            }
            Promise.all(promise)
                .then((urls) => {
                    setFormData((prevState) => ({
                        ...prevState,
                        images: prevState.images.concat(urls) // Corrected here
                    }));
                    setUploading(false);
                })
                .catch((err) => {
                    setUploading(false);
                    setImageUploadError('Image upload failed (2 mb max per image)');
                });
        } else {
            setUploading(false);
            setImageUploadError('You can only upload 6 images per listing');
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
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
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.price<=0){
          return  seterror("Price should be greater than 0")
        }
        if(formData.fromDate<Date.now()|| formData.toDate<Date.now()){
            return  seterror("Give correct date")
        }
        const dataToSend = {
            ...formData,
            ownerId: currentUser // Add ownerId to the data
        };
        
        try {
            const res = await fetch('/backend/item/additem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            const data = await res.json();
            Toastify({
                text: "Item Added Successfuly",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
              }).showToast();
            console.log(data);
        } catch (error) {
            console.log(error);    
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Item Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            type='file'
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            disabled={uploading}
                            type='button'
                            onClick={handleImageSubmit}
                            className='mt-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-70'
                        >
                            {uploading ? 'Uploading...' : 'Upload Images'}
                        </button>
                    </div>

                    {formData.images.length > 0 && ( // Change images to use formData.images
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {formData.images.map((url, index) => (
                                <div key={index} className='flex flex-col items-center border border-gray-300 rounded-lg p-2'>
                                    <img
                                        src={url}
                                        alt='listing image'
                                        className='w-full h-32 object-cover rounded-lg mb-2'
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Condition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <textarea
                            name="condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {imageUploadError && <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>}
            </div>
        </div>
    );
};

export default AddItemPage;

