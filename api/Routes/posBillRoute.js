import express from "express";
import { get,post } from "../controllers/posBillController.js";

const router = express.Router()

router.get('/', get)
router.post('/', post)

export default router