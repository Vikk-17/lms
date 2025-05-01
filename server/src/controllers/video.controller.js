import { 
    findVideoByModule,
    insertVideoIntoModule,
    findVideoById,
    updateVideoById,
    deleteVideoById
 } from "../services/db/video.service.js";

 export const getVideosByModule = async (req,res)=>{
    try{
        const moduleId = req.params.moduleid;
        const videos = await findVideoByModule(moduleId);
        res.status(200).json(videos);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const createVideoToModule = async (req,res)=>{
    try{
        const videoData = req.body;
        const moduleId = req.params.moduleid;
        const newVideo = await insertVideoIntoModule({...videoData,module:moduleId});
        res.status(200).json(newVideo);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const getVideo = async (req,res)=>{
    try{
        const videoId = req.params.videoid;
        const video = await findVideoById(videoId);
        res.status(200).json(video);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const updateVideo = async (req,res)=>{
    try{
        const videoId = req.params.videoid;
        const videoData = req.body;
        const udatedVideo = await updateVideoById(videoId,videoData);
        res.status(200).json(udatedVideo);
    } catch(error){
        res.status(500).json({message:'internal error',error});
    }
};

export const deleteVideo = async (req,res)=>{
   try{
    const videoId = req.params.videoid;
    const deletedVideo = await deleteVideoById(videoId);
    res.status(200).json(deletedVideo);
   } catch(error){
    res.status(500).json({message:'internal error',error});
   }
};

