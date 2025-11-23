import express from "express";
import { criarProfessor, listarProfessores, obterProfessorPorId } from "../controllers/professorController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/professores", autenticarToken, verificarPerfil(["admin"]), criarProfessor);
router.get("/professores", autenticarToken, verificarPerfil(["admin", "professor"]), listarProfessores);
router.get("/professores/:id", autenticarToken, verificarPerfil(["admin", "professor"]), obterProfessorPorId);

export default router;
