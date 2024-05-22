import express from 'express';
import { dispatch, get, post, put } from '../controllers/retailPriceController.js';

const router = express.Router();

router.get('/', get)
router.post('/', post)
router.put('/', put)
router.delete('/', dispatch)

export default router