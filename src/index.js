import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.DB_MONGO);

mongoose.connection.on("error", (error) => {
  console.error("Erro de conexão com o MongoDB:", error);
});

mongoose.connection.once("connected", () => {
  console.log(`Conectado ao MongoDB`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Conectado ao MongoDB" });
  console.log("Get aqui");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

