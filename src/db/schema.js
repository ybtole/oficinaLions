import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   adress: {
      type: String,
      required: true,
   },
   specialties: {
      type: [String],
      required: true,
   },
   vehicles: { // Atendidos
      type: [Number], // array que armazena id dos veiculos
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

const vehicleSchema = new mongoose.Schema({
   plate: {
      type: String,
      required: true,
      unique: true
   },
   model: {
      type: String,
      required: true,
   },
   year: {
      type: Number,
      required: true,
   },
   owner: {
      type: String,
      required: true,
      unique: true
   },
   maintenances: {
      type: [Number],
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

const maintenanceSchema = new mongoose.Schema({
   workshop: { // Um ObjectId referenciando a oficina onde a manutenção foi realizada.
      type: String,
      required: true,
   },
   vehicle: { // Um ObjectId referenciando o veículo que foi submetido à manutenção.
      type: String,
      required: true,
   },
   services: {
      type: [String], // Um array de objetos, cada um contendo o nome do serviço e o preço.
      required: true,
   },
   totalCost: { // O valor total da manutenção (soma dos preços dos serviços).
      type: Number,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

const MWorkshop = mongoose.model("Workshop", workshopSchema);
const MVehicle = mongoose.model("Vehicle", vehicleSchema);
const MMaintenance = mongoose.model("Maintenance", maintenanceSchema);

export default { MWorkshop, MVehicle, MMaintenance }