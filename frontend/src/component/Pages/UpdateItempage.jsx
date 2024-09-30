 import React, { useState } from 'react'
  import {getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
  import { useSelector } from 'react-redux';
  import { app } from '../../firebase';

  const UpdateItempage = () => {
      const [formData, setFormData] = useState({
          itemName: "",
          category: "",
          description: "",
          price: "",
          images: [],
          condition: "",
          fromDate: "",
         toDate: ""
      }); 
      const {currentUser}=useSelector((state)=>state.user)
      const [error,seterror]=useState('')
     const [files,setFiles]=useState([])
      const [uploading, setUploading] = useState(false);
      const [imageUploadError,setImageUploadError]=useState(false)
  
      const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({
              ...formData,
              [name]: value,
          });
      };
    
      const handleFileChange = (e) => {
          if(files.length>0 && files.length + formData.image.length<7 )
              {   
            const promise=[];
      for(let i=0;i<files.length;i++)
      {
          promise.push(storeImage(files[i]));
      }
      Promise.all(promise)
                .then((urls)=>{
                  setFormData({
                      ...formData,
                      images:formData.images.concat(urls)
                  })
                  setUploading(false);
                })
                .catch((err)=>{
                  setUploading(false);
             setImageUploadError('Image upload failed (2 mb max per image)')
                })  
      }
      else{
          setUploading(false);
          setImageUploadError('You can only upload 6 images per listing');
      }
      }
      const storeImage=async(file)=>{
          return new Promise((resolve,reject)=>{
          const storage=getStorage(app)
          const fileName=new Date().getTime() + file.name;
          const storageRef=ref(storage,fileName)
          const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
          const progress=
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);  
      },
      (error) => {
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              resolve(downloadURL);
          })
        }
    )
      })
      } 
    
      const handleSubmit = (e) => {
          e.preventDefault();
          console.log(formData);
        //    Add form submission logic here
      };
    
      return (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-center">Update Item</h2>
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
                          >
                              Update Item
                          </button>
                      </div>
                  </form>
              </div>
          </div>
     )
   }

  export default UpdateItempage
