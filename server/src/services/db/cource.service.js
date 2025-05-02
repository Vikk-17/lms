import Cource from "../../models/cource.model.js";

export const findAllCources = async ()=>{
    return await Cource.find();
};
export const insertIntoCource = async (courceData)=>{
    return await Cource.create(courceData);
};
export const findCourceById = async (courceId)=>{
    return await Cource.findById(courceId).populate('module');
};
export const updateCourceById = async (courceId,updateData)=>{
    return await Cource.findByIdAndUpdate(courceId,updateData,{new:true});
};
export const deleteCourceById = async (courceId)=>{
    return await Cource.findByIdAndDelete(courceId);
};
