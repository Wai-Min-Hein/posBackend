import express from "express";
import { dispatch, get, post, put } from "../controllers/MenuCategoryController.js";

const router = express.Router();

router.get('/', get)
router.post('/', post)
router.put('/', put)
router.delete('/:id', dispatch)


export default router