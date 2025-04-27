import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './src/config/db.config.js';
import router from './src/routes/auth.routes.js';
const app = express();
dotenv.config({path:'../.env'});
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

dbConnect();

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send("hello world from sumit");
});
  
app.listen(PORT,()=>{
    console.log(`server running: http://localhost:${PORT}/ `);
});