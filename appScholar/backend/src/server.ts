import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { connectBD, sequelize } from "./config/db";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

connectBD();

sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Tabelas sincronizadas com o banco!");
});

export default app;