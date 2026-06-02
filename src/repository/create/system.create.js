// system.create.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

// Função para criar uma nova oficina
export async function createWorkshopService(workshop) {
    console.log("Criando oficina no banco de dados:", workshop);
    // Mongoose usa o método .create() para salvar um novo documento
    const newWorkshop = await MWorkshop.create(workshop);
    return newWorkshop;
}

// Função para criar um novo veículo
export async function createVehicleService(vehicle) {
    console.log("Criando veículo no banco de dados:", vehicle);
    const newVehicle = await MVehicle.create(vehicle);
    return newVehicle;
}

// Função para registrar uma manutenção e atualizar os relacionamentos
export async function createMaintenanceService(maintenance) {
    console.log("Registrando manutenção no banco de dados:", maintenance);
    
    // 1. Cria a manutenção no banco
    const newMaintenance = await MMaintenance.create(maintenance);
    
    // 2. Adiciona o ID da manutenção na lista de manutenções do veículo
    // O operador $addToSet adiciona o ID apenas se ele já não existir na lista
    await MVehicle.findByIdAndUpdate(maintenance.vehicle, {
        $addToSet: { maintenances: newMaintenance._id }
    });
    
    // 3. Adiciona o ID do veículo na lista de veículos atendidos pela oficina
    await MWorkshop.findByIdAndUpdate(maintenance.workshop, {
        $addToSet: { vehicles: maintenance.vehicle }
    });
    
    return newMaintenance;
}