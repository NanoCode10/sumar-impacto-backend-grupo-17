const express = require("express");

const organizationsRoutes = require("./routes/organizationsRoutes");

const app = express();
const PORT = 3000;

//Middleware incorporado en Express para parsear el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

// Configuración del motor de plantillas Pug
app.set("view engine", "pug");

// fundamental para montar el Router de organizaciones en la ruta "/organizations"
app.use("/organizations", organizationsRoutes);

/**
 * MÓDULO CAMPAIGN (segundo módulo del grupo) - PENDIENTE
 * Todavía NO se monta ningún router de campañas. Guía de implementación:
 *   1. Completar los métodos estáticos de models/Campaign.js (findById, findAll, create, update, delete),
 *      incluyendo la validación de organizationId contra Organization.
 *   2. Crear controllers/campaignsController.js con la misma estructura que organizationsController.js
 *      (getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign).
 *   3. Crear routes/campaignsRoutes.js con las rutas del recurso, reutilizando el middleware validateId.
 *   4. Importar ese router acá y montarlo, por ejemplo:
 *        const campaignsRoutes = require("./routes/campaignsRoutes");
 *        app.use("/campaigns", campaignsRoutes);
 * Mantener el mismo estilo (JavaScript simple, CommonJS, sin services ni repositories).
 */
// TODO: montar el router de Campaign cuando el módulo esté implementado (ver guía de arriba)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
