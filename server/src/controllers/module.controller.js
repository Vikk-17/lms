import { 
    insertIntoModule,
    findAllModule,
    findModuleById,
    updateModuleById,
    deleteModuleById
 } from "../services/db/module.service.js";

export const getModulesByCource = async (req,res)=>{
    try{
        const modules = await findAllModule();
        res.status(200).json(modules);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const createModule = async (req,res)=>{
   try{
    const dataModule = req.body;
    const courceId = req.params.courceid;
    const newModule = await insertIntoModule({...dataModule,cource:courceId});
    res.status(200).json(newModule);
   } catch(error){
    res.status(500).json({message:'internal error',error})
   }
};

export const getModule = async (req,res)=>{
    try{
        const moduleId = req.params.moduleid;
        const module = await findModuleById(moduleId);
        res.status(200).json(module);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const updateModule = async (req,res)=>{
    try{
        const moduleId = req.params.moduleid;
        const moduleData = req.body;
        const updatedModule = await updateModuleById(moduleId,moduleData);
        res.status(200).json(updatedModule);
    } catch(error){
        res.status(500).json({message:"internal error",error});
    }
};

export const deleteModule = async (req,res)=>{
    try{
        const id = req.params.moduleid;
        const deletedModule = await deleteModuleById(id);
        res.status(200).json(deletedModule);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

