// src/convert-existing-passwords.ts
import { sequelize } from "./config/db";
import { Usuario } from "./models/usuario";
import dotenv from "dotenv";

dotenv.config();

async function convertExistingPasswords() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados");

    // Lista de usuários para converter
    const usuariosParaConverter = [
      { email: "admin@scholar.com", senha: "admin123" },
      { email: "admin@teste.com", senha: "admin123" },
      { email: "teste@escola.com", senha: "teste123" }
    ];

    for (const userInfo of usuariosParaConverter) {
      const usuario = await Usuario.findOne({ where: { email: userInfo.email } });
      
      if (usuario) {
        const senhaAtual = usuario.getDataValue("senha");
        
        // Verificar se já não é texto simples
        if (senhaAtual !== userInfo.senha) {
          await usuario.update({ senha: userInfo.senha });
          console.log(`✅ ${userInfo.email}: senha convertida para "${userInfo.senha}"`);
        } else {
          console.log(`ℹ️  ${userInfo.email}: já está com senha simples`);
        }
      } else {
        console.log(`❌ ${userInfo.email}: usuário não encontrado`);
      }
    }

    console.log("\n🎉 CONVERSÃO CONCLUÍDA!");
    console.log("Agora você pode fazer login com senhas simples durante o desenvolvimento");

  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    await sequelize.close();
  }
}

convertExistingPasswords();