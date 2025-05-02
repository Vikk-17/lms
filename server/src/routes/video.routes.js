import express from 'express';
import { 
    getVideosByModule,
    createVideoToModule,
    getVideo,
    updateVideo,
    deleteVideo
 } from '../controllers/video.controller.js';
const router = express.Router({mergeParams:true});
router.route('/')
    .get(getVideosByModule)
    .post(createVideoToModule);
router.route('/:videoid')
    .get(getVideo)
    .put(updateVideo)
    .delete(deleteVideo);
export default router;