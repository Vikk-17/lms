import express from 'express';
import { login,register } from '../controllers/auth.controller.js';
import { validateUser } from '../middlewares/validate.middleware.js';
import { registerSchema,loginSchema } from '../validators/auth.validator.js';
const router = express.Router();

router.post('/register',validateUser(registerSchema),register);
router.post('/login',login);

export default router;