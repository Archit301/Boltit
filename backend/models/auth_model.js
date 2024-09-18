import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        type:String
    },
    contactInfo: {
        phone: { type: String },
        address: { type: String },
        location: {
          latitude: { type: Number },
          longitude: { type: Number }
        }
    },
    averageRating:{ 
        type: Number, 
        default: 0 },  
        borrowedItems: [{ 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Item' }],
     lentItems: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Item' }],
    pendingRequests: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BorrowRequest' }],
        createdAt: 
        { type: Date,
         default: Date.now },
        updatedAt: 
        { type: Date,
         default: Date.now }
})

export const User=mongoose.model("User",userSchema)