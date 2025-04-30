import { insertUser,findUserByEmail } from "../services/db/user.service.js";
import { comparePassword } from "../services/auth/auth.service.js";
import { signAccessToken,verifyAccessToken } from "../services/auth/auth.service.js";

export const register = async (req,res)=>{
    try{
        const data = req.body;
        const existingUser = await findUserByEmail(data.email);
        if(existingUser){
            return res.status(400).json({message:'user already exists'});
        }
        const user = await insertUser({...data,role:'student',});
        res.status(201).json({
            message:'register successfully',
            user:user,
        });
    } catch(error){
        res.status(500).json({message:'internal error',error:error});
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(400).json({message:'invalid credentials'});
        }
        const ismatch = await comparePassword(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:'invalid credentials'});
        }
        const token = await signAccessToken({ userId: user._id, name: user.name, email: user.email,role:user.role});
        res.cookie('token',token,{httpOnly:true, maxAge: 1 * 60 * 1000 });
        res.status(200).json({message:'login successful',token:token});
    }catch(error){
        res.status(500).json({message:'internal error'});
    }
}

