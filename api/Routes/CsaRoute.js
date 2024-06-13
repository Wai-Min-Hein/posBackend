import express from 'express';
import { dispatch, get, post } from '../controllers/csaController.js';

const router = express.Router();

router.get('/', get)
router.post('/', post)
router.delete('/:id', dispatch)

export default router;