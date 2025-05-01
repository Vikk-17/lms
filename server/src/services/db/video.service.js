import Video from "../../models/video.model.js";
import { updateModuleById } from "./module.service.js";

export const findVideoByModule = async (module)=>{
    return await Video.find({module});
};
export const insertVideoIntoModule = async (videoData)=>{
    const newVideo = await Video.create(videoData);
    await updateModuleById(newVideo.module,{$push:{video:newVideo._id}}); //after video insertion,it also push video id to module video array
    return newVideo;
};
export const findVideoById = async (videoId)=>{
    return Video.findById(videoId);
};
export const updateVideoById = async (videoId,updateData)=>{
    return await Video.findByIdAndUpdate(videoId,updateData,{new:true});
};
export const deleteVideoById = async (videoId)=>{
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    await updateModuleById(deletedVideo.module,{$pull:{video:deletedVideo._id}}); //after video deletion,it also pop video id from module video array 
    return deletedVideo;
};