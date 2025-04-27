import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const DB_CONFIG = {
    url:process.env.MONGO_URI,
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}

const dbConnect = async()=>{ 
    try {
        await mongoose.connect(DB_CONFIG.url,DB_CONFIG.options);
        console.log('db connected');
    } catch(error){
        console.log(`db connection error: ${error}`);
    }
}

export default dbConnect;