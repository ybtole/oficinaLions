// system.read.js

import { getAllWorkshops, getWorkshopByID, getAllVehicles, getVehicleByID, getAllMaintenances, getMaintenanceByID } from "../repository/read/system.read.repository.js";

export async function getAllWorkshopsService() {
    try {
        const workshops = await getAllWorkshops();
        return workshops;
    } catch (error) {
        console.error("Erro ao buscar todas as oficinas", error);
        throw error;
    }
}

export async function getWorkshopByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        const workshop = await getWorkshopByID(id);
        return workshop;
    } catch (error) {
        console.error("Erro ao buscar a oficina", error);
        return error;
    }
}

export async function getAllVehiclesService() {
    try {
        const vehicles = await getAllVehicles();
        return vehicles;
    } catch (error) {
        console.error("Erro ao buscar todos os veículos", error);
        throw error;
    }
}

export async function getVehicleByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        const vehicle = await getVehicleByID(id);
        return vehicle;
    } catch (error) {
        console.error("Erro ao buscar o veículo", error);
        return error;
    }
}

export async function getAllMaintenancesService() {
    try {
        const maintenances = await getAllMaintenances();
        return maintenances;
    } catch (error) {
        console.error("Erro ao buscar todas as manutenções", error);
        throw error;
    }
}

export async function getMaintenanceByIdService(id) {
    try {
        if (!id) {
            throw new Error("Id não preenchido");
        }
        const maintenance = await getMaintenanceByID(id);
        return maintenance;
    } catch (error) {
        console.error("Erro ao buscar a manutenção", error);
        return error;
    }
}