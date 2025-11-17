import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Professor = sequelize.define("Professor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titulacao: {
    type: DataTypes.STRING,
  },
  tempoDocencia: {
    type: DataTypes.INTEGER,
  },
});
