import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    ownerId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
         required: true },
    itemName: { 
        type: String,
        required: true },
    description: {
         type: String, 
         required: true },
    category: { 
        type: String,
       required: true },
    condition: {
       type: String, 
       required: true }, 
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String }
      },
    availability: {
        fromDate: { type: Date, required: true },
        toDate: { type: Date, required: true }
      },
    images: [{
         type: String
         }],  
    isAvailable: { 
        type: Boolean,
         default: true },
    borrowRequests: [{ 
       type: mongoose.Schema.Types.ObjectId,
        ref: 'BorrowRequest' }],
    createdAt: {
         type: Date,
         default: Date.now },
    updatedAt: { 
        type: Date,
       default: Date.now 
    }
})

export const Item=mongoose.model("Item",itemSchema);