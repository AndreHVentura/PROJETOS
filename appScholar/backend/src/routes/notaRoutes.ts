import express from "express";
import { cadastrarNota } from "../controllers/notaController";
import { autenticarToken, verificarPerfil } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", autenticarToken, verificarPerfil(["admin", "professor"]), cadastrarNota);

export default router;
