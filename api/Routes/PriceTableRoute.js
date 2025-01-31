import express from 'express';
import { dispatch, get, getSingleData, getSingleDataByName, post, put } from '../controllers/PriceTableController.js';
import { rabcMiddleware } from '../MiddleWares/RbacMiddleware.js';

const router = express.Router();

router.get('/',rabcMiddleware('PriceTable','view'), get)
router.get('/:id', getSingleData)
router.get('/area/:name', getSingleDataByName)
router.post('/', post)
router.post('/:id', put)
router.delete('/:id', dispatch)

export default router;