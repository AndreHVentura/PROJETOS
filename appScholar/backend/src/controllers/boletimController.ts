import { Request, Response } from "express";
import { Nota } from "../models/nota";
import { Aluno } from "../models/aluno";
import { Disciplina } from "../models/disciplina";

export const consultarBoletim = async (req: Request, res: Response) => {
  const { idAluno } = req.params;
  try {
    const boletim = await Nota.findAll({
      where: { alunoId: idAluno },
      include: [
        { model: Disciplina, attributes: ["nome", "cargaHoraria"] },
        { model: Aluno, attributes: ["nome", "matricula", "curso"] },
      ],
    });
    if (!boletim || boletim.length === 0) {
      return res
        .status(404)
        .json({ message: "Boletim não encontrado para este aluno." });
    }
    res.json(boletim);
  } catch (error) {
    res.json({ message: "Erro ao consultar boletim.", error });
  }
};
