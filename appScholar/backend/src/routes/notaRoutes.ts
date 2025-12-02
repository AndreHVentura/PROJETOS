import express from "express";
import {
  cadastrarNota,
  atualizarNota,
  listarNotas,
  listarDisciplinasDoProfessor,
  listarAlunosPorDisciplina,
  buscarNotaAlunoDisciplina,
} from "../controllers/notaController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  autenticarToken,
  verificarPerfil(["admin", "professor"]),
  cadastrarNota
);
router.put(
  "/:id",
  autenticarToken,
  verificarPerfil(["admin", "professor"]),
  atualizarNota
);
router.get(
  "/",
  autenticarToken,
  verificarPerfil(["admin", "professor"]),
  listarNotas
);

router.get(
  "/professor/disciplinas",
  autenticarToken,
  verificarPerfil(["professor", "admin"]),
  listarDisciplinasDoProfessor
);
router.get(
  "/disciplina/:disciplinaId/alunos",
  autenticarToken,
  verificarPerfil(["professor", "admin"]),
  listarAlunosPorDisciplina
);
router.get(
  "/aluno/:alunoId/disciplina/:disciplinaId",
  autenticarToken,
  verificarPerfil(["professor", "admin"]),
  buscarNotaAlunoDisciplina
);

export default router;
