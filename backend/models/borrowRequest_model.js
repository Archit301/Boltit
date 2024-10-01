import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema({
    itemId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Item', 
          required: true },  // Reference to the item being borrowed
    borrowerId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true }, // Reference to the user requesting the item
    lenderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         required: true },   // Reference to the user lending the item
//     requestedDates: {
//       fromDate: { 
//         type: Date,
//         required: true },
//       toDate: { 
//         type: Date, 
//         required: true }
//     },
    status: { 
        type: String,
        enum: ['pending', 'approved', 'rejected', 'returned', 'returnedcheck'],
         default: 'pending' }, // Status of the request
    requestDate: {
         type: Date,
          default: Date.now },
    approvalDate: { 
        type: Date },
    returnDate: {
         type: Date },
    createdAt: { 
        type: Date,
         default: Date.now },
    updatedAt: { 
        type: Date,
         default: Date.now }

})


export const BorrowRequest=mongoose.model("BorrowRequest",borrowRequestSchema)