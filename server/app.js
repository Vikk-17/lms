import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/db.config.js';
import router from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './src/middlewares/auth.middleware.js';
const app = express();
dotenv.config({path:'../.env'});
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

dbConnect();

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send("hello world from sumit");
});

app.get('/cources',authenticate,(req,res)=>{
    res.status(200).json({message:'welcome to cources section',user:req.user});
});
  
app.listen(PORT,()=>{
    console.log(`server running: http://localhost:${PORT}/ `);
});