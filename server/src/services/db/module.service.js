import Module from "../../models/module.model.js";
import { updateCourceById } from "./cource.service.js";

export const findAllModule = async ()=>{
    return await Module.find();
};
export const insertIntoModule = async (moduleData)=>{
    const newModule = await Module.create(moduleData);
    await updateCourceById(newModule.cource,{$push:{module:newModule._id}});
    return newModule;
};
export const findModuleById = async (moduleId)=>{
    return await Module.findById(moduleId).populate('video');
};
export const updateModuleById = async (moduleId,updateData)=>{
    return await Module.findByIdAndUpdate(moduleId,updateData,{new:true});
};
export const deleteModuleById = async (moduleId)=>{
    return await Module.findByIdAndDelete(moduleId);
};