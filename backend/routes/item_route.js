import express from "express"
import { Additem } from "../controller/item_controller.js"

const router=express.Router()
router.post('/additem',Additem)
export default router;