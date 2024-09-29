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
    try {
        const deleteitem=await Item.deletebyId(req.body)

    } catch (error) {
        
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


