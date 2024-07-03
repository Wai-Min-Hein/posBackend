import express from 'express';
import { dispatch, get, getSingle, post, put } from '../controllers/fnbController.js';
import { rabcMiddleware } from '../MiddleWares/RbacMiddleware.js';


const router = express.Router();

router.get('/', get)
router.get('/:id', getSingle)
// router.post('/', rabcMiddleware(['create'],'Fnb'), post)
router.post('/', post)
router.put('/', put)
// router.delete('/', rabcMiddleware(['delete'],'Fnb'), dispatch)
router.delete('/', dispatch)

export default router;
