import express from 'express';
import { dispatch, get, post, put } from '../controllers/fnbController.js';
import { rabcMiddleware } from '../MiddleWares/RbacMiddleware.js';


const router = express.Router();

router.get('/', get)
router.post('/', rabcMiddleware(['create'],'Fnb'), post)
router.put('/', put)
router.delete('/', rabcMiddleware(['delete'],'Fnb'), dispatch)

export default router;
