import { 
    insertIntoCource,
    findAllCources,
    findCourceById,
    updateCourceById,
    deleteCourceById
 } from "../services/db/cource.service.js";

export const getAllCources = async (req,res)=>{
    try{
        const cources = await findAllCources();
        res.status(200).json(cources);
    } catch(error){
        res.status(500).json({message:"internal error",error});
    }
};

export const createCource = async (req,res)=>{
<<<<<<< HEAD
    const data = req.body;
    console.log(data);
    res.status(200).json({message:"hello from post cources"})
}
=======
    try{
        const courceData = req.body;
        const newCource = await insertIntoCource(courceData);
        res.status(201).json(newCource);
    } catch(error){
        res.status(500).json({message:"internal error",error});
    }
};
>>>>>>> feature/instructor-upload-cources

export const getCource = async (req,res)=>{
    try{
        const courceId = req.params.courceid;
        const cource = await findCourceById(courceId);
        res.status(200).json(cource);
    }catch(error){
        res.status(500).json({message:"internal error",error});
    }
};

export const updateCource = async (req,res)=>{
    try{
        const id = req.params.courceid;
        const updateData = req.body;
        const updatedCource = await updateCourceById(id,updateData);
        res.status(200).json(updatedCource);
    } catch(error){
        res.status(500).json({message:"internal error",error});
    }
};

export const deleteCource = async (req,res)=>{
    try{
        const id = req.params.courceid;
        const deletedCource = await deleteCourceById(id);
        res.status(200).json(deletedCource);
    }catch(error){
        res.status(500).json({message:"internal error",error});
    }
};