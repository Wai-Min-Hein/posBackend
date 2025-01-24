import express from 'express';
import { refreshAccessToken, signIn, signUp } from '../controllers/authController.js';
import authMiddleware from '../MiddleWares/AuthMiddleware.js';

const router = express.Router();

router.post('/', signUp)
router.post('/signIn', signIn)
router.post('/refresh',authMiddleware, refreshAccessToken);


export default router