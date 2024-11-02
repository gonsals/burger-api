const puppeteer = require("puppeteer");

async function scrapeNutritionalInfo(burgerNames) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let results = [];

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let name of burgerNames) {
        try {
            const url = `https://mcdonalds.es/productos/sandwiches-principales/${name}`;
            await page.goto(url, { waitUntil: "networkidle2" });
            await wait(2000);

            const acceptCookiesButton = await page.$(
                "#onetrust-accept-btn-handler"
            );
            if (acceptCookiesButton) {
                await acceptCookiesButton.click();
                await wait(2000);
            }

            await page.waitForSelector(".accordion-header");
            await page.click(".accordion-header");
            await wait(2000);

            await page.waitForSelector(".nutritional-information", {
                timeout: 5000,
            });

            const info = await page.evaluate(() => {
                const getText = (selector) =>
                    document.querySelector(selector)?.innerText || null;

                const nutritionalData = {};
                const rows = Array.from(
                    document.querySelectorAll(
                        ".nutritional-information table tbody tr"
                    )
                );

                rows.forEach((row) => {
                    const cells = row.querySelectorAll("td");
                    if (cells.length > 0) {
                        const key = cells[0].innerText.trim();
                        // Ignora filas con clave vacía
                        if (key) {
                            const per100g = cells[1]?.innerText.trim() || null;
                            const perServing =
                                cells[2]?.innerText.trim() || null;
                            nutritionalData[key] = {
                                por_100g: per100g,
                                por_porcion: perServing,
                            };
                        }
                    }
                });

                return {
                    nombre: getText("h1"),
                    calorías: getText(".nutritional-information h3"),
                    nutrición: nutritionalData,
                };
            });

            results.push(info);
        } catch (error) {
            console.error(`Error al obtener datos de ${name}:`, error);
        }
    }

    await browser.close();
    return results;
}

module.exports = { scrapeNutritionalInfo };
