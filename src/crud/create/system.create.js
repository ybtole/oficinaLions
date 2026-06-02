// system.create.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

export async function createWorkshop(workshop) {
    console.log(" Dados da oficina no repository: " + workshop);
    const newWorkshop = await MWorkshop.insertOne(workshop);
    return newWorkshop;
}

export async function createVehicle(vehicle) {
    console.log(" Dados do veículo no repository: " + vehicle);
    const newVehicle = await MVehicle.insertOne(vehicle);
    return newVehicle;
}

export async function createMaintenance(maintenance) {
    console.log(" Dados da manutenção no repository: " + maintenance);
    const newMaintenance = await Mmaintenance.insertOne(maintenance);
    return newMaintenance;
}