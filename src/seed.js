require("dotenv").config();
const mongoose = require("mongoose");
const Burger = require("./models/Burger");
const burgers = require("../burgers.json");

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

const seedDB = async () => {
    await connectDB(process.env.MONGODB_URI);

    await Burger.deleteMany({});

    try {
        await Burger.insertMany(burgers);
        console.log("Datos importados exitosamente");
    } catch (error) {
        console.error("Error al importar los datos:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
