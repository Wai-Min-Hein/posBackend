import express from 'express';
import { get, post, put } from '../controllers/fnbController.js';


const router = express.Router();

router.get('/', get)
router.post('/', post)
router.put('/', put)

export default router;
