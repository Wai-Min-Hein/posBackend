import express from 'express';
import { get, getProductsByCategory, post } from '../controllers/productController.js';

const router = express.Router()

router.get('/', get)
router.get('/:categoryId', getProductsByCategory)
router.post('/', post)

export default router