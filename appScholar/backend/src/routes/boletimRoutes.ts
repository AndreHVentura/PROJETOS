import express from "express";
import { consultarBoletim } from "../controllers/boletimController";
import { autenticarToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:idAluno", autenticarToken, consultarBoletim);

export default router;
