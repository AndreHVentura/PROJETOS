import express from "express";
import {
  criarDisciplina,
  listarDisciplinas,
  obterDisciplinaPorId,
} from "../controllers/disciplinaController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  autenticarToken,
  verificarPerfil(["admin", "professor"]),
  criarDisciplina
);
router.get("/", autenticarToken, listarDisciplinas);
router.get("/:id", autenticarToken, obterDisciplinaPorId);

export default router;
