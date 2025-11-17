import express from "express";
import { criarDisciplina, listarDisciplinas } from "../controllers/disciplinaController";

const router = express.Router();

router.post("/disciplinas", criarDisciplina);
router.get("/disciplinas", listarDisciplinas);

export default router;
