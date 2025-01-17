import express from 'express';
import { dispatch, get, getSingle, post, put } from '../controllers/fnbController.js';
import { rabcMiddleware } from '../MiddleWares/RbacMiddleware.js';


const router = express.Router();

router.get('/',rabcMiddleware('Fnb','view'), get)
router.get('/:id', getSingle)
router.post('/', post)
router.put('/', put)
router.delete('/:id', dispatch)

export default router;
