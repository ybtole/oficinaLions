// system.delete.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

// Deleta uma oficina e remove a oficina de qualquer outro lugar se necessário
export async function deleteWorkshop(id) {
    console.log("Deletando oficina:", id);
    
    // Além de deletar a oficina, vamos limpar as manutenções associadas a ela para não ter lixo no banco
    await MMaintenance.deleteMany({ workshop: id });
    
    const deletedWorkshop = await MWorkshop.deleteOne({ _id: id });
    return deletedWorkshop;
}

// Deleta um veículo e limpa as referências dele
export async function deleteVehicle(id) {
    console.log("Deletando veículo:", id);

    // 1. Remove as manutenções vinculadas a esse veículo
    await MMaintenance.deleteMany({ vehicle: id });

    // 2. Remove o veículo da lista de veículos das oficinas
    await MWorkshop.updateMany(
        { vehicles: id },
        { $pull: { vehicles: id } }
    );

    // 3. Deleta o veículo
    const deletedVehicle = await MVehicle.deleteOne({ _id: id });
    return deletedVehicle;
}

// Deleta uma manutenção e limpa sua referência no veículo
export async function deleteMaintenance(id) {
    console.log("Deletando manutenção:", id);

    // 1. Busca a manutenção antes de deletar para saber quem é o veículo
    const maintenance = await MMaintenance.findById(id);
    if (maintenance) {
        // 2. Remove o ID da manutenção da lista do veículo
        await MVehicle.findByIdAndUpdate(maintenance.vehicle, {
            $pull: { maintenances: id }
        });
    }

    // 3. Deleta a manutenção
    const deletedMaintenance = await MMaintenance.deleteOne({ _id: id });
    return deletedMaintenance;
}