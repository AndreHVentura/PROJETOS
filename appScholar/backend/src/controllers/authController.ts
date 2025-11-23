import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;

const MODO_DESENVOLVIMENTO = process.env.NODE_ENV !== 'production';

console.log("🎯 AUTHCONTROLLER CARREGADO - MODO:", MODO_DESENVOLVIMENTO ? 'DESENVOLVIMENTO' : 'PRODUÇÃO');

export const registrarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    let senhaParaSalvar;

    if (MODO_DESENVOLVIMENTO) {
      console.log(" MODO DESENVOLVIMENTO: Salvando senha como texto simples");
      senhaParaSalvar = senha;
    } else {
      console.log("MODO PRODUÇÃO: Criptografando senha");
      senhaParaSalvar = await bcrypt.hash(senha, 10);
    }

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaParaSalvar,
      perfil,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      usuario: {
        id: novoUsuario.getDataValue("id"),
        nome: novoUsuario.getDataValue("nome"),
        email: novoUsuario.getDataValue("email"),
        perfil: novoUsuario.getDataValue("perfil"),
      }
    });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao registrar usuário", detalhes: error });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
   console.log("🔄 AUTHCONTROLLER HÍBRIDO - Versão com texto simples está rodando!");
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const senhaNoBanco = usuario.getDataValue("senha");
    let senhaValida = false;
    let metodo = "INVÁLIDA";

    try {
      senhaValida = await bcrypt.compare(senha, senhaNoBanco);
      if (senhaValida) {
        metodo = "BCRYPT";
      }
    } catch (error) {
      console.log("Erro no bcrypt.compare, tentando comparação direta...");
    }

    if (!senhaValida && MODO_DESENVOLVIMENTO) {
      senhaValida = senha === senhaNoBanco;
      if (senhaValida) {
        metodo = "TEXTO_SIMPLES";
      }
    }

    console.log("🔐 DEBUG LOGIN:", {
      email,
      senhaRecebida: senha,
      senhaNoBanco: senhaNoBanco.substring(0, 20) + '...', 
      senhaValida,
      metodo,
      modo: MODO_DESENVOLVIMENTO ? 'DESENVOLVIMENTO' : 'PRODUÇÃO'
    });

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        id: usuario.getDataValue("id"),
        perfil: usuario.getDataValue("perfil"),
        nome: usuario.getDataValue("nome"),
        email: usuario.getDataValue("email"),
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.getDataValue("id"),
        nome: usuario.getDataValue("nome"),
        email: usuario.getDataValue("email"),
        perfil: usuario.getDataValue("perfil"),
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao realizar login", detalhes: error });
  }
};
