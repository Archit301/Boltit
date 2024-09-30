import mongoose from "mongoose";
import { Item } from "../models/item_model.js"

export const Additem=async(req,res,next)=>{
    try {
        const newitem=new Item(req.body)
        await newitem.save();
        res.status(200).json("Item Created Sucessfully")
    } catch (error) {
        next(error)
    }
}


export const updateitem=async(req,res,next)=>{
    try {
        const updateitem=await Item.findByIdAndUpdat(  req.body,{$new:true})
        res.status(200).json("Item Update Sucessfully");
    } catch (error) {
        next(error);
    }
}


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
