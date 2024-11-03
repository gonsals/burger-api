require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const burgerRoutes = require("./routes/burgerRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URI);

app.use(express.json());
app.use("/api/hamburguesas", burgerRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
