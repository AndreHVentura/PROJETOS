import express from "express";
import cors from "cors";
import { connectBD, sequelize } from "../config/db";
import { Usuario } from "../models/usuario";
import { Aluno } from "../models/aluno";
import { Professor } from "../models/professor";
import { Disciplina } from "../models/disciplina";

const app = express();
app.use(cors({
  origin: [
    'http://localhost:19006',
    'exp://192.168.15.29:19000',
    'http://192.168.15.29:19006' 
  ],
  credentials: true
}));

import authRoutes from "../routes/authRoutes";
import alunoRoutes from "../routes/alunoRoutes";
import professorRoutes from "../routes/professorRoutes";
import disciplinaRoutes from "../routes/disciplinaRoutes";
import boletimRoutes from "../routes/boletimRoutes";
import notaRoutes from "../routes/notaRoutes";

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

// Função para inicializar o banco de dados
const initializeDatabase = async () => {
  try {
    await connectBD();
    
    await sequelize.sync({ alter: true });
    
    console.log("✅ Modelos sincronizados (mantendo dados existentes).");
    
    // Verificar se admin já existe
    const adminExists = await Usuario.findOne({ 
      where: { email: "admin@scholar.com" } 
    });
    
    if (!adminExists) {
      // Criar apenas se não existir
      const bcrypt = require("bcryptjs");
      const senhaHash = await bcrypt.hash("admin123", 10);
      
      await Usuario.create({
        nome: "Administrador",
        email: "admin@scholar.com",
        senha: senhaHash,
        perfil: "admin"
      });
      console.log("✅ Usuário admin criado");
    }
    
    // Verificar se há dados para popular apenas se necessário
    const totalAlunos = await Aluno.count();
    const totalProfessores = await Professor.count();
    const totalDisciplinas = await Disciplina.count();
    
    console.log(`📊 Dados atuais no banco:`);
    console.log(`   - Alunos: ${totalAlunos}`);
    console.log(`   - Professores: ${totalProfessores}`);
    console.log(`   - Disciplinas: ${totalDisciplinas}`);
    
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
  }
};

// Inicializar o servidor
const startServer = async () => {
  try {
    await initializeDatabase();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Endpoints disponíveis:`);
      console.log(`   http://localhost:${PORT}/api/health`);
      console.log(`   http://localhost:${PORT}/api/alunos`);
      console.log(`   http://localhost:${PORT}/api/professores`);
      console.log(`   http://localhost:${PORT}/api/disciplinas`);
      console.log(`   http://localhost:${PORT}/api/notas`);
      console.log(`   http://localhost:${PORT}/api/boletim/:matricula`);
    });
    
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor:", error);
    process.exit(1);
  }
};

export { initializeDatabase, startServer };
export default app;
