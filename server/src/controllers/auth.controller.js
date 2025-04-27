
export const register = async(req,res)=>{
    const data = req.body;
    console.log(data);
    res.status(200).json({message:'register success'});
}

export const login = async(req,res)=>{
    res.status(200).json({message:"login successfully"});
}

