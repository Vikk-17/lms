import express from 'express';
import { registerInstructor } from '../controllers/instructor.controller.js';
import { validateUser } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../validators/auth.validator.js';

const router = express.Router(); 

router.get('/',(req,res)=>{
    res.status(200).json({message:"hello from instructor"});
});

router.post('/register',validateUser(registerSchema),registerInstructor);

export default router;