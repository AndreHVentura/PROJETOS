import express from "express";
import { criarProfessor, listarProfessores } from "../controllers/professorController";

const router = express.Router();

router.post("/professores", criarProfessor);
router.get("/professores", listarProfessores);

export default router;
