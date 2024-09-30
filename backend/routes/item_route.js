import express from "express"
import { Additem, allitemlisting, deleteitem, itemlisting } from "../controller/item_controller.js"

const router=express.Router()
router.post('/additem',Additem)
router.get('/list/:ownerId',itemlisting)
router.post('/delete',deleteitem)
router.get('/allitem/:ownerId',allitemlisting)
export default router;