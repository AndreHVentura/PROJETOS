import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

// Usuário padrão para administração inicial
export const criarUsuarioPadrao = async () => {
  try {
    const usuarioExistente = await Usuario.findOne({ 
      where: { email: "admin@email.com" } 
    });
    
    if (!usuarioExistente) {
      const senhaHash = await bcrypt.hash("123456", 10);
      await Usuario.create({
        nome: "Administrador",
        email: "admin@email.com",
        senha: senhaHash,
        perfil: "admin"
      });
      console.log("Usuário padrão criado: admin@email.com / 123456");
    }
  } catch (error) {
    console.error("Erro ao criar usuário padrão:", error);
  }
};

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