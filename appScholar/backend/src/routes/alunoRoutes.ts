import express from "express";
import { criarAluno, listarAlunos, obterAlunoPorId } from "../controllers/alunoController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/alunos", autenticarToken, verificarPerfil(["admin", "professor"]), criarAluno);
router.get("/alunos", autenticarToken, verificarPerfil(["admin", "professor"]), listarAlunos);
router.get("/alunos/:id", autenticarToken, verificarPerfil(["admin", "professor"]), obterAlunoPorId);

export default router;
