import express, { application } from "express"
import mongoose from "mongoose"
import cors from "cors"


const app=express()
app.use(cors());
const PORT=2000
app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`)
})