import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   adress:{
    type: String,
    required: true,
   },
   specialties:{
    type: [String],
    required: true,
   },
   vehicles:{ // Atendidos
    type: String,
    required: true
   },
   createdAt:{
    type: Date,
    default: Date.now,
   }
});

const vehicleSchema = new mongoose.Schema({
   plate:{
    type: String,
    required: true,
    unique: true
   },
   adress:{
    type: String,
    required: true,
   },
   specialties:{
    type: [String],
    required: true,
   },
   vehicles:{ // Atendidos
    type: String,
    required: true
   },
   createdAt:{
    type: Date,
    default: Date.now,
   }
});

const maintenanceSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   adress:{
    type: String,
    required: true,
   },
   specialties:{
    type: [String],
    required: true,
   },
   vehicles:{ // Atendidos
    type: String,
    required: true
   },
   createdAt:{
    type: Date,
    default: Date.now,
   }
});

const MWorkshop = mongoose.model("Workshop", workshopSchema);
const MVehicle = mongoose.model("Vehicle", vehicleSchema);
const MMaintenance = mongoose.model("Maintenance", maintenanceSchema);

export default { MWorkshop, MVehicle, MMaintenance }