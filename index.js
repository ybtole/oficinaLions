import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.DB_MONGO);

