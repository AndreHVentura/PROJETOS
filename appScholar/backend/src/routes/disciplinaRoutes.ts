import express from "express";
import { criarDisciplina, listarDisciplinas, obterDisciplinaPorId } from "../controllers/disciplinaController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/disciplinas", autenticarToken, verificarPerfil(["admin"]), criarDisciplina);
router.get("/disciplinas", autenticarToken, listarDisciplinas);
router.get("/disciplinas/:id", autenticarToken, obterDisciplinaPorId);

export default router;
