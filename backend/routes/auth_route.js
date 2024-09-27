import express from "express"
import { google, login, register, signout } from "../controller/auth_controller.js"

const router=express.Router()

router.post('/login',register)
router.post('/signin',login)
router.post('/google',google)
router.get('/signout',signout)

export default router