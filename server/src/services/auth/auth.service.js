import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({path:'../.env'});
export const comparePassword = async (password,hashPassword)=>{
    return await bcrypt.compare(password,hashPassword);
}   

export const signAccessToken = async (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '1m',
    });
}

export const verifyAccessToken = async (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET);
}
