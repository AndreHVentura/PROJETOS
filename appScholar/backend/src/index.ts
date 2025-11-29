import app, { initializeDatabase } from "./types/server";
import { connectBD } from "./config/db";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectBD();
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`AppScholar API - Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();