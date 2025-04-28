import { verifyAccessToken } from "../services/auth/auth.service.js";

export const authenticate = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message:'unauthorized: no token found'});
        const user = await verifyAccessToken(token);
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}