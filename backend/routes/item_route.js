import express from "express"
import { Additem, itemlisting } from "../controller/item_controller.js"

const router=express.Router()
router.post('/additem',Additem)
router.get('/list/:ownerId',itemlisting)
export default router;