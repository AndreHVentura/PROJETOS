import { Request, Response } from "express";
import { Nota } from "../models/nota";

export const cadastrarNota = async (req: Request, res: Response) => {
    try {
        const {alunoId, disciplinaId, nota1, nota2, nota3, nota4, nota5 } = req.body;
        const media = ((nota1 + nota2 + nota3 + nota4 + nota5) / 5).toFixed(2);
        const situacao = parseFloat(media) >= 6 ? 'Aprovado' : 'Reprovado';
        const nota = await Nota.create({ alunoId, disciplinaId, nota1, nota2, nota3, nota4, nota5, media, situacao });
        res.status(201).json(nota);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar nota', details: error });
    }
};