const Burger = require("../models/Burger");
const { scrapeNutritionalInfo } = require("../scraper/scraper");

exports.scrapeAndStoreBurgers = async (burgerNames) => {
    try {
        const data = await scrapeNutritionalInfo(burgerNames);
        const burgers = await Burger.insertMany(data);
        return burgers;
    } catch (error) {
        throw new Error(
            "Error al realizar el scraping o almacenar los datos: " +
                error.message
        );
    }
};
