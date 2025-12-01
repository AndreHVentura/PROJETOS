import express from "express";
import cors from "cors";
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
    await sequelize.sync({ force: true }); // Sincroniza todos os modelos
    console.log("✅ Modelos sincronizados com o banco de dados.");
    
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
      console.log("✅ Usuário admin padrão criado: admin@scholar.com");
    } else {
      console.log("✅ Usuário admin já existe: admin@scholar.com");
    }

    // 4. Verificar se os modelos estão acessíveis
    console.log("✅ Modelos carregados:");
    console.log("   - Usuario:", !!Usuario);
    console.log("   - Aluno:", !!Aluno);
    console.log("   - Professor:", !!Professor);
    console.log("   - Disciplina:", !!Disciplina);
    console.log("   - Nota:", !!Nota);
    
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
    process.exit(1); // Encerra o aplicativo em caso de erro crítico
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
