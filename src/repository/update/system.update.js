// system.update.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

// Atualiza uma oficina cadastrada
export async function updateWorkshop(id, workshop) {
    console.log("Atualizando oficina:", id, workshop);
    const updatedWorkshop = await MWorkshop.findByIdAndUpdate(id, workshop, { new: true });
    if (!updatedWorkshop) {
        throw new Error("Oficina não encontrada");
    }
    return updatedWorkshop;
}

// Atualiza um veículo cadastrado
export async function updateVehicle(id, vehicle) {
    console.log("Atualizando veículo:", id, vehicle);
    const updatedVehicle = await MVehicle.findByIdAndUpdate(id, vehicle, { new: true });
    if (!updatedVehicle) {
        throw new Error("Veículo não encontrado");
    }
    return updatedVehicle;
}

// Atualiza uma manutenção cadastrada
export async function updateMaintenance(id, maintenanceData) {
    console.log("Atualizando manutenção:", id, maintenanceData);
    
    // Buscamos o registro atual no banco
    const maintenance = await MMaintenance.findById(id);
    if (!maintenance) {
        throw new Error("Manutenção não encontrada");
    }

    const oldVehicleId = maintenance.vehicle.toString();
    const oldWorkshopId = maintenance.workshop.toString();

    // Atualizamos os dados nos campos correspondentes
    if (maintenanceData.workshop) maintenance.workshop = maintenanceData.workshop;
    if (maintenanceData.vehicle) maintenance.vehicle = maintenanceData.vehicle;
    if (maintenanceData.services) maintenance.services = maintenanceData.services;
    if (maintenanceData.date) maintenance.date = maintenanceData.date;

    // Salvamos usando .save() para disparar o gatilho (pre-save) que calcula o totalCost
    const updatedMaintenance = await maintenance.save();

    // Se o veículo associado mudou, atualizamos as referências dele
    if (maintenanceData.vehicle && maintenanceData.vehicle.toString() !== oldVehicleId) {
        // Remove a manutenção do veículo antigo
        await MVehicle.findByIdAndUpdate(oldVehicleId, {
            $pull: { maintenances: id }
        });
        // Adiciona a manutenção no veículo novo
        await MVehicle.findByIdAndUpdate(maintenanceData.vehicle, {
            $addToSet: { maintenances: id }
        });
    }

    // Se a oficina associada mudou, garantimos que o veículo é adicionado na nova oficina
    if (maintenanceData.workshop && maintenanceData.workshop.toString() !== oldWorkshopId) {
        await MWorkshop.findByIdAndUpdate(maintenanceData.workshop, {
            $addToSet: { vehicles: maintenance.vehicle }
        });
    }

    return updatedMaintenance;
}