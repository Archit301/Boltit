import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', 
        required: true },    // Reference to the item being reviewed
    borrowerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true }, // Reference to the user who borrowed the item
    lenderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },   // Reference to the user who lent the item
    rating: { 
        type: Number, 
        min: 1, max: 5, 
        required: true },  // Rating from 1 to 5
    reviewText: { 
        type: String },                              // Text review
    reviewDate: { 
        type: Date, 
        default: Date.now }
  });


  export const Review=mongoose.model("Review",reviewSchema)
  