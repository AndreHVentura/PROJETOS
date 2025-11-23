import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes";
import alunoRoutes from "../routes/alunoRoutes";
import professorRoutes from "../routes/professorRoutes";
import disciplinaRoutes from "../routes/disciplinaRoutes";
import boletimRoutes from "../routes/boletimRoutes";
import notaRoutes from "../routes/notaRoutes";
import { connectBD, sequelize } from "../config/db";
import { Usuario } from "../models/usuario";
import { Aluno } from "../models/aluno";
import { Professor } from "../models/professor";
import { Disciplina } from "../models/disciplina";
import { Nota } from "../models/nota";

const app = express();
app.use(cors({
  origin: [
    'http://localhost:19006',
    'exp://192.168.15.29:19000',
    'http://192.168.15.29:19006' 
  ],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/professores", professorRoutes);
app.use("/api/disciplina", disciplinaRoutes);
app.use("/api/boletim", boletimRoutes);
app.use("/api/nota", notaRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Função para sincronizar os modelos com o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Modelos sincronizados com o banco de dados.");
    
    // Criar usuário admin padrão se não existir
    const adminExists = await Usuario.findOne({ 
      where: { email: "admin@scholar.com" } 
    });
    
    if (!adminExists) {
      const bcrypt = require("bcryptjs");
      const senhaHash = await bcrypt.hash("admin123", 10);
      
      await Usuario.create({
        nome: "Administrador",
        email: "admin@scholar.com",
        senha: senhaHash,
        perfil: "admin"
      });
      console.log("Usuário admin padrão criado: admin@scholar.com");
    } else {
      console.log("Usuário admin já existe: admin@scholar.com");
    }
  } catch (error) {
    console.error("Erro ao sincronizar modelos:", error);
  }
};

export { syncDatabase };
export default app;
