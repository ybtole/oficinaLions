// system.delete.js
import { MWorkshop, MVehicle, MMaintenance } from '../../db/schema.js';

export async function deleteWorkshop(id) {
    const deletedWorkshop = await MWorkshop.deleteOne({ _id: id });
    return deletedWorkshop;
}

export async function deleteVehicle(id) {
    const deletedVehicle = await MVehicle.deleteOne({ _id: id });
    return deletedVehicle;
}

export async function deleteMaintenance(id) {
    const deletedMaintenance = await MMaintenance.deleteOne({ _id: id });
    return deletedMaintenance;
}