import { Request, Response } from "express";
import { Aluno } from "../models/aluno";

export const criarAluno = async (req: Request, res: Response) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao cadastradar aluno", detalhes: error });
  }
};

export const listarAlunos = async (req: Request, res: Response) => {
  const alunos = await Aluno.findAll();
  res.json(alunos);
};

export const obterAlunoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aluno = await Aluno.findByPk(id);
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ error: "Aluno não encontrado" });
  }
};
