import express from "express";
import { get,post,put, dispatch } from "../controllers/ProductCategoryController.js";

const router = express.Router();

router.get('/', get)
router.post('/', post)
router.put('/', put)
router.delete('/:id', dispatch)


export default router