import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   specialties: {
      type: [String],
      required: true,
   },
   vehicles: [{ // Atendidos
      type: mongoose.Schema.Types.ObjectId, // Um array de ObjectIds referenciando os veículos atendidos pela oficina. 
      ref: "Vehicle", // Referência ao modelo Vehicle
   }],
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
   },
   maintenances: [{
      type: mongoose.Schema.Types.ObjectId, // Um array de ObjectIds referenciando as manutenções realizadas no veículo.
      ref: "Maintenance", // Referência ao modelo Maintenance
   }],
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

const maintenanceSchema = new mongoose.Schema({
   workshop: { // Um ObjectId referenciando a oficina onde a manutenção foi realizada.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
   },
   vehicle: { // Um ObjectId referenciando o veículo que foi submetido à manutenção.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
   },
   services: [{
      name: {
         type: String,
         required: true
      },
      price: {
         type: Number,
         required: true
      }
   }],
   totalCost: {
      type: Number,
      default: 0
   },
   date: {
      type: Date,
      required: true,
      default: Date.now,
   }
});

maintenanceSchema.pre("save", function (next) {
   this.totalCost = this.services.reduce(
      (sum, service) => sum + service.price, 0);
   if (typeof next === "function") {
      next();
   }
});

export const MWorkshop = mongoose.model("Workshop", workshopSchema);
export const MVehicle = mongoose.model("Vehicle", vehicleSchema);
export const MMaintenance = mongoose.model("Maintenance", maintenanceSchema);