// src/check-exact-password.ts
import { sequelize } from "./config/db";
import { Usuario } from "./models/usuario";
import dotenv from "dotenv";

dotenv.config();

async function checkExactPassword() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados");

    const admin = await Usuario.findOne({ where: { email: "admin@scholar.com" } });
    
    if (admin) {
      const senhaNoBanco = admin.getDataValue("senha");
      
      console.log("🔍 VERIFICAÇÃO DETALHADA:");
      console.log(`Email: ${admin.getDataValue("email")}`);
      console.log(`Senha no banco (EXATA): "${senhaNoBanco}"`);
      console.log(`Tamanho: ${senhaNoBanco.length} caracteres`);
      console.log(`É igual a "admin123"? ${senhaNoBanco === "admin123"}`);
      console.log(`Contém espaços? ${senhaNoBanco.includes(' ')}`);
    }

  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    await sequelize.close();
  }
}

checkExactPassword();