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

<<<<<<< HEAD:backend/models/cart_model.js
const Cart=mongoose.model("Cart", cartSchema)
export default Cart
=======
const Cart=mongoose.model("Cart",cartSchema)
export default Cart
>>>>>>> 5e21e4868dc0cee9644d200634172d827fc5049a:backend/models/Cart_model.js
