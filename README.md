
# Hamburguesas API 🍔

Una API en Node.js y MongoDB para gestionar información nutricional de hamburguesas. La API permite realizar operaciones CRUD sobre las hamburguesas y consultas específicas como obtener el mejor ratio de cantidad-precio.

**URL Base de la API:** [https://burger-api.up.railway.app/api/hamburguesas](https://burger-api.up.railway.app/api/hamburguesas)

## Tabla de Contenidos
- [Configuración](#configuración)
- [Uso de la API](#uso-de-la-api)
- [Endpoints](#endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Manejo de Errores](#manejo-de-errores)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Configuración

Esta API está desplegada en Railway. Puedes acceder a los endpoints de forma remota usando la URL base: `https://burger-api.up.railway.app/api/hamburguesas`

## Uso de la API

La API permite interactuar con datos de hamburguesas mediante varios endpoints. A continuación se listan los principales endpoints disponibles y sus funciones.

## Endpoints

| Método | Endpoint                     | Descripción                                       |
|--------|-------------------------------|---------------------------------------------------|
| GET    | `/api/hamburguesas`           | Obtiene todas las hamburguesas                    |
| POST   | `/api/hamburguesas`           | Crea una nueva hamburguesa                        |
| GET    | `/api/hamburguesas/:id`       | Obtiene una hamburguesa por ID                    |
| PUT    | `/api/hamburguesas/:id`       | Actualiza una hamburguesa por ID                  |
| DELETE | `/api/hamburguesas/:id`       | Elimina una hamburguesa por ID                    |
| GET    | `/api/hamburguesas/ratio/best`| Obtiene la hamburguesa con mejor ratio cantidad-precio |
| GET    | `/api/hamburguesas/ratio/bests`| Obtiene las 5 mejores hamburguesas por ratio cantidad-precio |
| POST   | `/api/hamburguesas/update`    | Actualiza el peso de todas las hamburguesas       |
| POST   | `/api/hamburguesas/scrape`    | Realiza scraping de datos nutricionales y los almacena |

## Ejemplos de Uso

Aquí tienes algunos ejemplos de cómo interactuar con la API utilizando `curl`:

1. **Listar todas las hamburguesas**
   ```bash
   curl -X GET https://burger-api.up.railway.app/api/hamburguesas
   ```

2. **Crear una nueva hamburguesa**
   ```bash
   curl -X POST https://burger-api.up.railway.app/api/hamburguesas \
   -H "Content-Type: application/json" \
   -d '{"nombre": "Big Mac", "calorías": "540", "price": 4.99, "nutrición": {"Valor Energético (kcal)": {"por_100g": "250"}}}'
   ```

3. **Actualizar una hamburguesa por ID**
   ```bash
   curl -X PUT https://burger-api.up.railway.app/api/hamburguesas/ID_DE_LA_HAMBURGUESA \
   -H "Content-Type: application/json" \
   -d '{"nombre": "Big Mac Actualizado", "calorías": "550"}'
   ```

4. **Eliminar una hamburguesa por ID**
   ```bash
   curl -X DELETE https://burger-api.up.railway.app/api/hamburguesas/ID_DE_LA_HAMBURGUESA
   ```

## Manejo de Errores

La API responde con un mensaje de error en formato JSON y el código de estado HTTP adecuado en caso de error. Ejemplo de respuesta de error:

```json
{
  "error": "Mensaje de error descriptivo",
  "status": 500
}
```

## Contribución

Para contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.
