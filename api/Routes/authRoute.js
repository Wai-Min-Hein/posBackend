import express from 'express';
import { refreshAccessToken, signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/', signUp)
router.post('/signIn', signIn)
router.post('/refresh', refreshAccessToken);


export default router