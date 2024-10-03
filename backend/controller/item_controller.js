import mongoose from "mongoose";
import { Item } from "../models/item_model.js"
import { BorrowRequest } from "../models/borrowRequest_model.js";
import Cart from "../models/Cart_model.js";
import { approveRequestNotification, declineRequestNotification, returnReminder } from "./notification_controller.js";


export const Additem=async(req,res,next)=>{
    try {
        const newitem=new Item(req.body)
        await newitem.save();
        res.status(200).json("Item Created Sucessfully")
    } catch (error) {
        next(error)
    }
}


export const updateitem = async (req, res, next) => {
  try {
      const updateitem = await Item.findByIdAndUpdate(
          req.body.id, // Assuming the item's ID is passed in the URL
          req.body,      // The new data to update with
          { new: true }  // To return the updated item
      );
      res.status(200).json("Item updated successfully");
  } catch (error) {
      next(error);
  }
};



export const deleteitem=async(req,res,next)=>{
    const {id}=req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const deleteitem=await Item.findById(id);
        if (!deleteitem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const result = await Item.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item has been deleted' }); 
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });       
    }
}





export const itemlisting=async(req,res,next)=>{
    const {ownerId}=req.params;
    // console.log(ownerId)
try {
    const item=await Item.find({ownerId})
    res.status(200).json(item)
} catch (error) {
    next(error);
}
}

export const requestitem=async(req,res,next)=>{
    
}



export const rentitemlisting=async(req,res,next)=>{

}


export const allitemlisting=async(req,res,next)=>{
    const {ownerId}=req.params;
    try {
        const items = await Item.find({ ownerId: { $ne: ownerId } });
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}


export const withoutloginallitemlisting=async(req,res,next)=>{
    try {
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}


export const itemdetail=async(req,res,next)=>{
    const {id}=req.params;
    try {
       const detailitem =await Item.find({_id:id})
       res.status(200).json(detailitem)
    } catch (error) {
      next(error)  
    }
}




export const isAvailable =async(req,res,next)=>{
    const {id}=req.params
    try {
        const available = await  Item.findOne({_id: id, isAvailable:true});
       res.status(200).json(available)
    } catch (error) {
        next(error)
    }
}

export const rentitem = async (req, res, next) => {
  const { itemId, borrowerId, lenderId } = req.body;
  try {
    // Find the item by ID
    const item = await Item.findById(itemId);
    
    // Check if the item exists
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Add the borrowerId to the borrowedrequest field
    item.borrowedrequest = borrowerId;
    
    // Save the updated item
    await item.save();

    // Create a new borrow request entry
    const rentItem = new BorrowRequest({
      itemId,
      borrowerId,
      lenderId,
    });

    // Save the borrow request to the database
    await rentItem.save();

    // Respond with success message
    res.status(200).json("Request sent successfully");
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};



export const ownerid=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const owner=await Item.findById({_id:id})
        res.status(200).json(owner)
    } catch (error) {
       next(error) 
    }
}

export const checkRequest = async (req, res, next) => {
    const {itemId, lenderId, borrowerId } = req.params;
   // console.log(req.params)
    // console.log("lenderId: ", lenderId);  // Add a log to debug
    try {
      const request = await BorrowRequest.find({ lenderId, borrowerId, itemId });
      
      // if (!request || request.length === 0) {
      //   return res.status(404).json({ message: 'No request found' });
      // }
  
      res.status(200).json(request);
    } catch (error) {
      next(error);
    }
  };
  

  export const cartitem=async(req,res,next)=>{
    const {user,item}=req.body;
    try {
        const cartitem=await new Cart(req.body)
        await cartitem.save();
        res.status(200).json("Item added to cart")
    } catch (error) {
        next(error)
    }
  }


  export const checkcartitem=async(req,res,next)=>{
    const {user,item}=req.params;
    try {
        const checkcart=await Cart.find({user,item})
        res.status(200).json(checkcart)
    } catch (error) {
        next(error)    
    }
  }


  export const cartitemlist = async (req, res, next) => {
    const { user } = req.params;
    try {
      // Fetch cart items for the user and populate the item field
      const cart = await Cart.find({ user }).populate('item'); // Assuming 'item' refers to another model
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };


  export const deleteitemlist = async (req, res, next) => {
   const {id}=req.body;
   try {
    const cart=await Cart.findByIdAndDelete({_id:id})
    res.status(200).json("Item delete from cart")
   } catch (error) {
    next(error)
   }
  }


  export const pendingitemlist = async (req, res, next) => {
    const { lenderId } = req.params;
  
    // Log the lenderId to verify its value
    // console.log("Lender ID:", lenderId);
  
    // Check if lenderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(lenderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lenderId format.",
      });
    }
  
    try {
      const items = await BorrowRequest.find({ lenderId, status: "pending" }).populate('borrowerId').populate('itemId');
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching pending items:", error); // Log the error for debugging
      next(error);
    }
  };
  

  export const borrowedrequest=async(req,res,next)=>{
    const {borrowerId}=req.params
    try {
        const item=await BorrowRequest.find({borrowerId,status:"approved"}).populate('itemId')
        res.status(200).json(item);
    } catch (error) {
        next(error)
    }
  }


  export const lentrequest=async(req,res,next)=>{
    const {lenderId}=req.params
    try {
        const item=await BorrowRequest.find({lenderId,status:"approved"}).populate('itemId')
        res.status(200).json(item);    
    } catch (error) {
        next(error)
    }
  }

  export const acceptrequest = async (req, res, next) => {
    const { id } = req.body;
    try {
      const item = await BorrowRequest.findById(id).populate('itemId'); // Use findById to get a single item by ID and populate itemId
      if (item) {
        item.status = "approved"; // Update the status to "approved"
        item.itemId.isAvailable = false; // Set isAvailable to false (boolean)
        await item.itemId.save(); // Save the changes to the itemId document
        await item.save(); // Save the changes to the BorrowRequest document
        await approveRequestNotification(item.borrowerId,item.itemId)
        return res.status(200).json("Request successfully approved and item marked as unavailable.");
      } else {
        return res.status(404).json('Item not found'); // Return a 404 status if the item is not found
      }
    } catch (error) {
      next(error); // Pass the error to the next middleware for error handling
    }
  };
  


  export const declinerequest=async(req,res,next)=>{
    const {id}=req.body;
    try {
     const item=await BorrowRequest.findByIdAndDelete({_id:id})
     await declineRequestNotification(item.borrowerId,item.itemId)
     console.log(item)
     res.status(200).json("Request declined")   
    } catch (error) {
        next(error)
    }
  }

  export const returnrequest=async(req,res,next)=>{
 const {id}=req.body;
 try {
    const item = await BorrowRequest.findById(id)
    if (item) {
      item.status = "returned"; 
      await item.save();
      await returnReminder(item.lenderId,item.itemId)
      return res.status(200).json("Item successfully removed");
    } else {
      return res.status(404).json('Item not found'); 
    }
  } catch (error) {
    next(error); 
  }
  }

  export const returncheckrequest=async(req,res,next)=>{
    const {id}=req.body;
 try {
    const item = await BorrowRequest.findById(id).populate('itemId')
    if (item) {
      item.status = "returnedcheck";
      item.itemId.isAvailable = true; 
      await item.itemId.save(); 
      await item.save();
      return res.status(200).json("Item successfully removed");
    } else {
      return res.status(404).json('Item not found'); 
    }
  } catch (error) {
    next(error); 
  }
  }



  export const lentitemrequest=async(req,res,next)=>{
    const {lenderId}=req.params
    try {
        const item=await BorrowRequest.find({lenderId,status:"returned"}).populate('itemId')
        res.status(200).json(item);    
    } catch (error) {
        next(error)
    }
  }


  export const allborroweditem=async(req,res,next)=>{
    const {borrowerId}=req.params
    try {
      const item=await Item.find({borrowRequests:borrowerId})
      res.status(200).json(item); 
    } catch (error) {
      next(error)
    }
  }

  export const edititem=async(req,res,next)=>{
    const {id}=req.body
    try {
      const item=await Item.find({_id:id})
      res.status(200).json(item); 
    } catch (error) {
      next(error)
    }
  }