import express from 'express';
import { get, getSingleData, post } from '../controllers/PriceTableController.js';

const router = express.Router();

router.get('/', get)
router.get('/:id', getSingleData)
router.post('/', post)

export default router;