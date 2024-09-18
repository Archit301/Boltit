import express, { application } from "express"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"


const app=express()
app.use(cors());
const PORT=2000
const MONGO="mongodb+srv://tambiarchit:archit123@cluster0.cbh0o.mongodb.net/"
mongoose.connect(MONGO)
.then(() => {
  console.log("Database is connected");
})
 const __dirname = path.resolve()
app.listen(PORT,()=>{
 console.log(`Server is running on port ${PORT}`);
})

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode ||500;
    const message=err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
  })