// system.update.js

import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

export async function updateWorkshop(id, workshop) {
    const updatedWorkshop = await MWorkshop.findByIdAndUpdate(id, workshop, { new: true });
    if (!updatedWorkshop) {
        throw new Error("Oficina não encontrada");
    }
    return updatedWorkshop;
}

export async function updateVehicle(id, vehicle) {
    const updatedVehicle = await MVehicle.findByIdAndUpdate(id, vehicle, { new: true });
    if (!updatedVehicle) {
        throw new Error("Veículo não encontrado");
    }
    return updatedVehicle;
}

export async function updateMaintenance(id, maintenance) {
    const updatedMaintenance = await MMaintenance.findByIdAndUpdate(id, maintenance, { new: true });
    if (!updatedMaintenance) {
        throw new Error("Manutenção não encontrada");
    }
    return updatedMaintenance;
}