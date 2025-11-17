import express from "express";
import { criarAluno, listarAlunos } from "../controllers/alunoController";

const router = express.Router();

router.post("/alunos", criarAluno);
router.get("/alunos", listarAlunos);

export default router;
