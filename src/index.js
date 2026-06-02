import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { workshopData } from './dados/dados.js';

// Importando os repositórios / serviços para criar registros
import { 
  createWorkshopService, 
  createVehicleService, 
  createMaintenanceService 
} from "./repository/create/system.create.js";

// Importando os repositórios / serviços para buscar/ler registros
import { 
  getAllWorkshopsService, 
  getWorkshopByIdService, 
  getAllVehiclesService, 
  getVehicleByIdService, 
  getAllMaintenancesService, 
  getMaintenanceByIdService,
  getWorkshopVehiclesService,
  getWorkshopMaintenancesService,
  getVehicleMaintenancesService
} from "./repository/read/system.read.js";

// Importando os repositórios / serviços para atualizar registros
import { 
  updateWorkshop, 
  updateVehicle, 
  updateMaintenance 
} from "./repository/update/system.update.js";

// Importando os repositórios / serviços para deletar registros
import { 
  deleteWorkshop, 
  deleteVehicle, 
  deleteMaintenance 
} from "./repository/delete/system.delete.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para que o Express entenda requisições no formato JSON
app.use(express.json());

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.DB_MONGO);

mongoose.connection.on("error", (error) => {
  console.error("Erro de conexão com o MongoDB:", error);
});

mongoose.connection.once("connected", () => {
  console.log(`Conectado com sucesso ao MongoDB!`);
});

// Rota inicial simples
app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor conectado ao MongoDB!" });
});

// ==========================================
// ROTAS DE OFICINA (WORKSHOP)
// ==========================================

// Criar Oficina
app.post("/oficinas", async (req, res) => {
  try {
    console.log("Recebendo dados para criar oficina:", req.body);
    const newWorkshop = await createWorkshopService(req.body);
    return res.status(201).json(newWorkshop);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao criar oficina", details: error.message });
  }
});

// Listar todas as Oficinas
app.get("/oficinas", async (req, res) => {
  try {
    console.log("Buscando todas as oficinas...");
    const workshops = await getAllWorkshopsService();
    return res.status(200).json(workshops);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar oficinas", details: error.message });
  }
});

// Buscar Oficina por ID
app.get("/oficinas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando oficina com ID: ${id}`);
    const workshop = await getWorkshopByIdService(id);
    if (!workshop) {
      return res.status(404).json({ Error: "Oficina não encontrada" });
    }
    return res.status(200).json(workshop);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar oficina", details: error.message });
  }
});

// Atualizar Oficina
app.put("/oficinas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Atualizando oficina com ID: ${id}`, req.body);
    const updated = await updateWorkshop(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao atualizar oficina", details: error.message });
  }
});

// Deletar Oficina
app.delete("/oficinas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deletando oficina com ID: ${id}`);
    const result = await deleteWorkshop(id);
    return res.status(200).json({ message: "Oficina deletada com sucesso!", result });
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao deletar oficina", details: error.message });
  }
});

// Listar Veículos atendidos por uma oficina específica
app.get("/oficinas/:id/veiculos", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando veículos atendidos pela oficina ID: ${id}`);
    const vehicles = await getWorkshopVehiclesService(id);
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar veículos da oficina", details: error.message });
  }
});

// Listar Manutenções realizadas em uma oficina específica
app.get("/oficinas/:id/manutencoes", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando manutenções da oficina ID: ${id}`);
    const maintenances = await getWorkshopMaintenancesService(id);
    return res.status(200).json(maintenances);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar manutenções da oficina", details: error.message });
  }
});


// ==========================================
// ROTAS DE VEÍCULO (VEHICLE)
// ==========================================

// Criar Veículo
app.post("/veiculos", async (req, res) => {
  try {
    console.log("Recebendo dados para criar veículo:", req.body);
    const newVehicle = await createVehicleService(req.body);
    return res.status(201).json(newVehicle);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao criar veículo", details: error.message });
  }
});

// Listar todos os Veículos
app.get("/veiculos", async (req, res) => {
  try {
    console.log("Buscando todos os veículos...");
    const vehicles = await getAllVehiclesService();
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar veículos", details: error.message });
  }
});

// Buscar Veículo por ID
app.get("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando veículo com ID: ${id}`);
    const vehicle = await getVehicleByIdService(id);
    if (!vehicle) {
      return res.status(404).json({ Error: "Veículo não encontrado" });
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar veículo", details: error.message });
  }
});

// Atualizar Veículo
app.put("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Atualizando veículo com ID: ${id}`, req.body);
    const updated = await updateVehicle(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao atualizar veículo", details: error.message });
  }
});

// Deletar Veículo
app.delete("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deletando veículo com ID: ${id}`);
    const result = await deleteVehicle(id);
    return res.status(200).json({ message: "Veículo deletado com sucesso!", result });
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao deletar veículo", details: error.message });
  }
});

// Listar Manutenções realizadas em um veículo específico
app.get("/veiculos/:id/manutencoes", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando manutenções do veículo ID: ${id}`);
    const maintenances = await getVehicleMaintenancesService(id);
    return res.status(200).json(maintenances);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar manutenções do veículo", details: error.message });
  }
});


// ==========================================
// ROTAS DE MANUTENÇÃO (MAINTENANCE)
// ==========================================

// Registrar Manutenção
app.post("/manutencoes", async (req, res) => {
  try {
    console.log("Recebendo dados para registrar manutenção:", req.body);
    const newMaintenance = await createMaintenanceService(req.body);
    return res.status(201).json(newMaintenance);
  } catch (error) {
    console.error("ERRO DETALHADO AO REGISTRAR MANUTENÇÃO:", error);
    return res.status(500).json({ Error: "Erro ao registrar manutenção", details: error.message, stack: error.stack });
  }
});

// Listar todas as Manutenções
app.get("/manutencoes", async (req, res) => {
  try {
    console.log("Buscando todas as manutenções...");
    const maintenances = await getAllMaintenancesService();
    return res.status(200).json(maintenances);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar manutenções", details: error.message });
  }
});

// Buscar Manutenção por ID
app.get("/manutencoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando manutenção com ID: ${id}`);
    const maintenance = await getMaintenanceByIdService(id);
    if (!maintenance) {
      return res.status(404).json({ Error: "Manutenção não encontrada" });
    }
    return res.status(200).json(maintenance);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao buscar manutenção", details: error.message });
  }
});

// Atualizar Manutenção
app.put("/manutencoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Atualizando manutenção com ID: ${id}`, req.body);
    const updated = await updateMaintenance(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao atualizar manutenção", details: error.message });
  }
});

// Deletar Manutenção
app.delete("/manutencoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deletando manutenção com ID: ${id}`);
    const result = await deleteMaintenance(id);
    return res.status(200).json({ message: "Manutenção deletada com sucesso!", result });
  } catch (error) {
    return res.status(500).json({ Error: "Erro ao deletar manutenção", details: error.message });
  }
});


// Auxiliar para a tela de cadastrar oficinas (mantida a rota original da atividade)
app.get("/oficinas/cadastrar", async (req, res) => {
  try {
    res.status(200).json(workshopData());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando com sucesso na porta ${port}`);
});

