import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes";
import alunoRoutes from "../routes/alunoRoutes";
import professorRoutes from "../routes/professorRoutes";
import disciplinaRoutes from "../routes/disciplinaRoutes";
import boletimRoutes from "../routes/boletimRoutes";
import notaRoutes from "../routes/notaRoutes";
import { connectBD, sequelize } from "../config/db";
import { criarUsuarioPadrao } from "../controllers/authController";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/alunos",alunoRoutes);
app.use("/api/professores",professorRoutes);
app.use("/api/disciplina",disciplinaRoutes);
app.use("/api/boletim", boletimRoutes);
app.use("/api/nota", notaRoutes);

const iniciarServidor = async () => {
  try {
    await connectBD();
    
    await sequelize.sync({ alter: true });
    console.log("📦 Tabelas sincronizadas com o banco!");
    
    // Cria usuário padrão após sincronizar tabelas
    await criarUsuarioPadrao();
    
    console.log("🚀 Servidor pronto para iniciar!");
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
  }
};

iniciarServidor();


export default app;