import express from "express"
import { google, login, register, signout, updateUser } from "../controller/auth_controller.js"

const router=express.Router()

router.post('/login',register)
router.post('/signin',login)
router.post('/google',google)
router.post('/signout',signout)
router.post('/update/:id',updateUser);

export default router