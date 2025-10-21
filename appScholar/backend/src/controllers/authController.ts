import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

export const registrarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      perfil,
    });
    res
      .status(201)
      .json({
        message: "Usuário registrado com sucesso",
        usuario: novoUsuario,
      });
  } catch (error) {
    res
      .status(400)
      .json({ erro: "Erro ao registrar usuário", detalhes: error });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.getDataValue("senha")
    );
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    const token = jwt.sign(
      {
        id: usuario.getDataValue("id"),
        perfil: usuario.getDataValue("perfil"),
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ mensagem: "Login realizado com", token });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao realizar login", detalhes: error });
  }
};