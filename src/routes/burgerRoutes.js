const express = require("express");
const router = express.Router();
const burgerController = require("../controllers/burgerController");
const scraperController = require("../controllers/scraperController");
const { body } = require("express-validator");

router.get("/", burgerController.getAllBurgers);
router.post(
    "/",
    [
        body("nombre")
            .isString()
            .notEmpty()
            .withMessage("El nombre es obligatorio."),
        body("calorías")
            .isString()
            .notEmpty()
            .withMessage("Las calorías son obligatorias."),
        body("nutrición")
            .isObject()
            .withMessage("La nutrición debe ser un objeto."),
    ],
    burgerController.createBurger
);

router.get("/:id", burgerController.getBurgerById);
router.put("/:id", burgerController.updateBurger);
router.delete("/:id", burgerController.deleteBurger);
router.get("/ratio/best", burgerController.getBestBurger);
router.get("/ratio/bests", burgerController.getBestBurgers);
router.post("/update", burgerController.updateAllBurgersWeight);
router.post("/scrape", scraperController.scrapeAndStoreBurgers);

module.exports = router;
