import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})
const app =  express();

app.use(express.json());

app.use(cookieParser());

app.listen(8800,()=>{
    console.log("Running Port 8800");
 })


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode ||500;
    const message = err.message||"Internal Server issue"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
 })