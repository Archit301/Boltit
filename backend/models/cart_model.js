import mongoose, { Schema } from "mongoose";

const cartSchema=new mongoose.Schema({
 user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
 },
 item:{
    type:Schema.Types.ObjectId,
    ref:"Item",
    required:true
},

})

const Cart=mongoose.model("Cart",cartSchema)
export default Cart