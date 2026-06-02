// system.read.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

// Busca todas as oficinas cadastradas
export async function getAllWorkshopsService() {
    try {
        console.log("Buscando todas as oficinas...");
        const workshops = await MWorkshop.find();
        return workshops;
    } catch (error) {
        console.error("Erro ao buscar todas as oficinas:", error);
        throw error;
    }
}

// Busca uma oficina específica pelo seu ID
export async function getWorkshopByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        console.log("Buscando oficina por ID:", id);
        const workshop = await MWorkshop.findById(id);
        return workshop;
    } catch (error) {
        console.error("Erro ao buscar a oficina por ID:", error);
        throw error;
    }
}

// Busca todos os veículos cadastrados
export async function getAllVehiclesService() {
    try {
        console.log("Buscando todos os veículos...");
        const vehicles = await MVehicle.find();
        return vehicles;
    } catch (error) {
        console.error("Erro ao buscar todos os veículos:", error);
        throw error;
    }
}

// Busca um veículo específico pelo seu ID
export async function getVehicleByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        console.log("Buscando veículo por ID:", id);
        const vehicle = await MVehicle.findById(id);
        return vehicle;
    } catch (error) {
        console.error("Erro ao buscar o veículo por ID:", error);
        throw error;
    }
}

// Busca todas as manutenções registradas
export async function getAllMaintenancesService() {
    try {
        console.log("Buscando todas as manutenções...");
        // O método populate("workshop") e populate("vehicle") serve para trazer os dados completos em vez de apenas os IDs
        const maintenances = await MMaintenance.find()
            .populate("workshop")
            .populate("vehicle");
        return maintenances;
    } catch (error) {
        console.error("Erro ao buscar todas as manutenções:", error);
        throw error;
    }
}

// Busca uma manutenção específica pelo seu ID
export async function getMaintenanceByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        console.log("Buscando manutenção por ID:", id);
        const maintenance = await MMaintenance.findById(id)
            .populate("workshop")
            .populate("vehicle");
        return maintenance;
    } catch (error) {
        console.error("Erro ao buscar a manutenção por ID:", error);
        throw error;
    }
}

// Busca todos os veículos atendidos por uma oficina específica
export async function getWorkshopVehiclesService(workshopId) {
    try {
        console.log("Buscando veículos atendidos pela oficina:", workshopId);
        const workshop = await MWorkshop.findById(workshopId).populate("vehicles");
        if (!workshop) {
            throw new Error("Oficina não encontrada");
        }
        return workshop.vehicles;
    } catch (error) {
        console.error("Erro ao buscar veículos da oficina:", error);
        throw error;
    }
}

// Busca todas as manutenções realizadas em uma oficina específica
export async function getWorkshopMaintenancesService(workshopId) {
    try {
        console.log("Buscando manutenções realizadas na oficina:", workshopId);
        const maintenances = await MMaintenance.find({ workshop: workshopId })
            .populate("vehicle")
            .populate("workshop");
        return maintenances;
    } catch (error) {
        console.error("Erro ao buscar manutenções da oficina:", error);
        throw error;
    }
}

// Busca todas as manutenções realizadas em um veículo específico
export async function getVehicleMaintenancesService(vehicleId) {
    try {
        console.log("Buscando manutenções do veículo:", vehicleId);
        const maintenances = await MMaintenance.find({ vehicle: vehicleId })
            .populate("workshop")
            .populate("vehicle");
        return maintenances;
    } catch (error) {
        console.error("Erro ao buscar manutenções do veículo:", error);
        throw error;
    }
}