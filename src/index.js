import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import { workshopData } from './dados/dados.js';
import { createWorkshopService } from "./crud/create/system.create.js";
import { getAllMaintenancesService, getAllWorkshopsService } from "./crud/read/system.read.js";

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

app.post("/oficinas", async (req, res) => {
  try {
    console.log(" Dados da oficina: " + req.body);
    const newWorkshop = await createWorkshopService(req.body);
    return res.status(201).json(newWorkshop);
  } catch (error) {
    return res.status(500).json({ Error: error.message, workshopData: workshopData() });
  }
});

app.get("/oficinas", async (req, res) => {
  try {
    return res.status(200).json(getAllWorkshopsService());
  } catch (error) {
    return res.status(500).json({ Error: error.message })
  }
})

app.get("/oficinas/cadastrar", async (req, res) => {
  try {
    res.status(200).json({
      metodo: "POST",
      body: {
        name: "string",
        address: "string",
        telefone: "number (formato: +XXYYZZZZZZZZZ)"
      },
      exemplo: {
        name: "Oficina do Heitor",
        address: "Rua das Flores, 123",
        telefone: "5542999201450"
      }
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
