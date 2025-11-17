import express from "express";
import { consultarBoletim } from "../controllers/boletimController";

const router = express.Router();

router.get("/:idAluno", consultarBoletim);

export default router;
