
export const validateUser =(schema)=>(req,res,next)=>{
    try{
        schema.parse(req.body);
        next();
    } catch(error){
        return res.status(400).json({
            message:'validation error',
            errors:error.errors,

        });
    }
};

