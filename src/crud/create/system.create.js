// system.create.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

export async function createWorkshopService(workshop) {
    console.log(" Dados da oficina no repository: " + workshop);
    const newWorkshop = await MWorkshop.insertOne(workshop);
    return newWorkshop;
}

export async function createVehicleService(vehicle) {
    console.log(" Dados do veículo no repository: " + vehicle);
    const newVehicle = await MVehicle.insertOne(vehicle);
    return newVehicle;
}

export async function createMaintenanceService(maintenance) {
    console.log(" Dados da manutenção no repository: " + maintenance);
    const newMaintenance = await MMaintenance.insertOne(maintenance);
    return newMaintenance;
}