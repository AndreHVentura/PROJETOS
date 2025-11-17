import express from "express";
import { cadastrarNota } from "../controllers/notaController";
const router = express.Router();

router.post("/", cadastrarNota);

export default router;
