import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Aluno } from "./aluno";
import { Disciplina } from "./disciplina";

export const Nota = sequelize.define("Nota", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nota1: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nota2: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nota3: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nota4: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nota5: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  media: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Definindo relacionamentos
Aluno.hasMany(Nota, { foreignKey: "alunoId", as: "notas" });
Nota.belongsTo(Aluno, { foreignKey: "alunoId", as: "aluno" });

Disciplina.hasMany(Nota, { foreignKey: "disciplinaId", as: "notas" });
Nota.belongsTo(Disciplina, { foreignKey: "disciplinaId", as: "disciplina" });
