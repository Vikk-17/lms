import express from 'express';
import moduleRoutes from './module.routes.js';
import { 
    getAllCources,
    createCource,
    getCource,
    updateCource,
    deleteCource 
} from '../controllers/cource.controller.js';
const router = express.Router();

router.route('/')
    .get(getAllCources)
    .post(createCource);
router.route('/:courceid')
    .get(getCource)
    .put(updateCource)
    .delete(deleteCource);

router.use('/:courceid/modules',moduleRoutes);

export default router;


