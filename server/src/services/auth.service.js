import User from "../models/user.model.js";
import bcrypt, { hash } from 'bcryptjs';

export const getUserByEmail = async (email)=>{
    return await User.findOne({email});
};

export const createUser = async ({name,email,password})=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User({name,email,password:hashedPassword});
    return await newUser.save();
};

export const comparePassword = async (password,hashPassword)=>{
    return await bcrypt.compare(password,hashPassword);
}