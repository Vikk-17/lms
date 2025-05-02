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
router.route('/:moduleid')
    .get(getModule)
    .put(updateModule)
    .delete(deleteModule);
router.use('/:moduleid/videos',videoRoutes);
export default router;