const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
    "Valor Energético (kJ)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Valor Energético (kcal)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Proteínas (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Hidratos de Carbono(g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Fibra (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Azúcares (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Grasas (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Ác. Grasos Saturados (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
    "Sal (g)": {
        por_100g: { type: String },
        por_porcion: { type: String },
    },
});

const burgerSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    calorías: { type: String, required: true },
    nutrición: { type: nutritionSchema, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Hamburguesas", burgerSchema);
