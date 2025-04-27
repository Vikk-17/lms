import express from 'express';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
 
app.get('/',(req,res)=>{
    res.send("hello world from sumit");
});

app.listen(PORT,()=>{
    console.log(`server running: http://localhost:${PORT}/ `);
});