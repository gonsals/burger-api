const Burger = require("../models/Burger");
const { validationResult } = require("express-validator");

exports.getAllBurgers = async (req, res) => {
    try {
        const burgers = await Burger.find();
        res.json(burgers);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createBurger = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newBurger = new Burger(req.body);
    try {
        await newBurger.save();
        res.status(201).json(newBurger);
    } catch (error) {
        res.status(400).json({
            message: "Error al agregar la hamburguesa",
            error,
        });
    }
};

exports.getBurgerById = async (req, res) => {
    try {
        const burger = await Burger.findById(req.params.id);
        if (!burger) {
            return res
                .status(404)
                .json({ message: "Hamburguesa no encontrada" });
        }
        res.json(burger);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la hamburguesa",
            error,
        });
    }
};

exports.updateBurger = async (req, res) => {
    try {
        const updatedBurger = await Burger.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBurger) {
            return res
                .status(404)
                .json({ message: "Hamburguesa no encontrada" });
        }
        res.json(updatedBurger);
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar la hamburguesa",
            error,
        });
    }
};

exports.deleteBurger = async (req, res) => {
    try {
        const deletedBurger = await Burger.findByIdAndDelete(req.params.id);
        if (!deletedBurger) {
            return res
                .status(404)
                .json({ message: "Hamburguesa no encontrada" });
        }
        res.json({ message: "Hamburguesa eliminada" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la hamburguesa",
            error,
        });
    }
};

exports.getBestBurger = async (req, res) => {
    try {
        const burgers = await Burger.find();
        let bestBurger = null;

        burgers.forEach((burger) => {
            const totalCalories = parseFloat(burger.calorías);
            const caloriesPer100g = parseFloat(
                burger.nutrición["Valor Energético (kcal)"].por_100g
            );
            const weight = (totalCalories / caloriesPer100g) * 100;
            const quantityPriceRatio = weight / burger.price;

            if (
                !bestBurger ||
                quantityPriceRatio > bestBurger.quantityPriceRatio
            ) {
                bestBurger = {
                    name: burger.nombre,
                    weight: weight,
                    price: burger.price,
                    quantityPriceRatio: quantityPriceRatio,
                };
            }
        });

        if (bestBurger) {
            res.json(bestBurger);
        } else {
            res.status(404).json({ error: "No se encontraron hamburguesas." });
        }
    } catch (err) {
        res.status(500).json({
            error: "Error al calcular el mejor ratio cantidad-precio.",
        });
    }
};

exports.getBestBurgers = async (req, res) => {
    try {
        const burgers = await Burger.find();
        const ratios = burgers.map((burger) => {
            const totalCalories = parseFloat(burger.calorías);
            const caloriesPer100g = parseFloat(
                burger.nutrición["Valor Energético (kcal)"].por_100g
            );
            const weight = (totalCalories / caloriesPer100g) * 100;
            const quantityPriceRatio = weight / burger.price;

            return {
                name: burger.nombre,
                weight: weight,
                price: burger.price,
                quantityPriceRatio: quantityPriceRatio,
            };
        });

        // Ordenar por quantityPriceRatio en orden descendente y obtener las 5 mejores
        const bestBurgers = ratios
            .sort((a, b) => b.quantityPriceRatio - a.quantityPriceRatio)
            .slice(0, 5);

        res.json(bestBurgers);
    } catch (err) {
        res.status(500).json({
            error: "Error al calcular los mejores ratios cantidad-precio.",
        });
    }
};
