import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/db.config.js';
import authRouter from './src/routes/auth.routes.js';
import instructorRouter from './src/routes/instructor.routes.js';
import courceRouter from './src/routes/cource.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './src/middlewares/auth.middleware.js';
const app = express();
dotenv.config({path:'../.env'});
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

dbConnect();


app.get('/',(req,res)=>{
    res.send("hello world from sumit");
});

app.get('/cources',authenticate,(req,res)=>{
    res.status(200).json({message:'welcome to cources section',user:req.user});
});

app.use('/api',authRouter);
app.use('/api/instructor',instructorRouter);
app.use('/api/admin',adminRouter);
app.use('/api/cources',courceRouter)
  
app.listen(PORT,()=>{
    console.log(`server running: http://localhost:${PORT}/ `);
});