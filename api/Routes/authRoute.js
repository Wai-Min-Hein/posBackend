import express from 'express';
import {  signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/', signUp)
router.post('/signIn', signIn)


export default router