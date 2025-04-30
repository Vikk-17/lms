import express from 'express';
import { 
    getModulesByCource,
    createModule,
    getModule,
    updateModule,
    deleteModule 
} from '../controllers/module.controller.js';
import videoRoutes from './video.routes.js';
const router = express.Router({mergeParams:true});

router.route('/')
    .get(getModulesByCource)
    .post(createModule);
router.route('/:moduleId')
    .get(getModule)
    .put(updateModule)
    .delete(deleteModule);
router.use('/:moduleId/videos',videoRoutes);
export default router;