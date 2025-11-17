import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM("admin", "professor", "aluno"),
    allowNull: false,
  },
});
