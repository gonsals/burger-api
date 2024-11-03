require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

const hamburguesaSchema = new mongoose.Schema({
    nombre: String,
    calorías: String,
    price: Number, // Campo para el precio
    peso: Number, // Campo para el peso
    nutrición: {
        "Valor Energético (kJ)": Object,
        "Valor Energético (kcal)": Object,
        "Proteínas (g)": Object,
        "Hidratos de Carbono(g)": Object,
        "Fibra (g)": Object,
        "Azúcares (g)": Object,
        "Grasas (g)": Object,
        "Ác. Grasos Saturados (g)": Object,
        "Sal (g)": Object,
    },
});

const Hamburguesa = mongoose.model("Hamburguesa", hamburguesaSchema);

const filePath = path.join(__dirname, "../burgers.json");
fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
        console.error("Error al leer el archivo JSON:", err);
        return;
    }

    try {
        const hamburguesas = JSON.parse(data);

        // Validar que hamburguesas sea un array
        if (!Array.isArray(hamburguesas)) {
            throw new Error("El JSON no es un array de hamburguesas.");
        }

        // Calcular el peso y agregarlo al objeto
        const hamburguesasConPeso = hamburguesas.map((hamburguesa) => {
            // Extraer calorías y valor energético
            const calorías = parseFloat(hamburguesa.calorías); // Convierte a número
            const valorEnergeticoKcal = parseFloat(
                hamburguesa.nutrición["Valor Energético (kcal)"].por_100g
            ); // Convierte a número

            // Calcular el peso
            const peso = (calorías / valorEnergeticoKcal) * 100; // Peso en gramos

            // Retornar el objeto con el nuevo campo 'peso'
            return {
                ...hamburguesa,
                peso: peso, // Agrega el peso calculado
            };
        });

        // Depuración: Verifica los datos de hamburguesas
        hamburguesasConPeso.forEach((hamburguesa) => {
            console.log(
                `Nombre: ${hamburguesa.nombre}, Precio: ${
                    hamburguesa.price
                }, Peso: ${hamburguesa.peso.toFixed(2)}g`
            );
        });

        await Hamburguesa.insertMany(hamburguesasConPeso);
        console.log("Datos importados exitosamente");

        // Cerrar la conexión
        mongoose.connection.close();
    } catch (error) {
        console.error("Error al importar los datos:", error);
    }
});
