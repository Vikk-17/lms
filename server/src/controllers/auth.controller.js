import { createUser,getUserByEmail,comparePassword } from "../services/auth.service.js";

export const register = async (req,res)=>{
    try{
        const data = req.body;
        const existingUser = await getUserByEmail(data.email);
        if(existingUser){
            return res.status(400).json({message:'user already exists'});
        }
        const user = await createUser(data);
        res.status(201).json({
            message:'register successfully',
            user:user,
        });
    } catch(error){
        console.log('register error',error);
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(400).json({message:'invalid credentials'});
        }
        const ismatch = await comparePassword(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:'invalid credentials'});
        }
        res.status(200).json({message:'login successful'});
    }catch(error){
        res.status(500).json({message:'internal error'});
    }
}

