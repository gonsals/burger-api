const mongoose = require("mongoose");

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Conexión a MongoDB establecida");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
