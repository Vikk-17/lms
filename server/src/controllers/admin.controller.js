import { insertUser,findUserByEmail } from "../services/db/user.service.js";

export const registerAdmin = async (req,res)=>{
    try{
        const data = req.body;
        const existingUser = await findUserByEmail(data.email);
        if(existingUser){
            return res.status(400).json({message:'user already exists'});
        }
        const user = await insertUser({...data,role:'admin',});
        res.status(201).json({
            message:'register successfully',
            user:user,
        });
    } catch(error){
        res.status(500).json({message:'internal error',error:error});
    }
}