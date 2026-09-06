const express = require("express");

// import Middlewares
const validateId = require("../middlewares/validateId");

// import Controllers
const { getOrganizationById } = require("../controllers/organizationsController");

// Create a new router instance
const router = express.Router();

// Define la ruta dinamica para obtener una organización por su ID, aplicando el middleware validateId antes de llamar al controlador getOrganizationById
router.get("/:id", validateId, getOrganizationById);

/**
 * RUTAS FUTURAS DEL RECURSO /organizations
 * Están COMENTADAS a propósito: los controllers todavía no están implementados ni exportados.
 * Para activar cada una:
 *   1. implementar y exportar el controller correspondiente en controllers/organizationsController.js;
 *   2. importarlo arriba junto a getOrganizationById;
 *   3. descomentar la línea de abajo.
 *
 * GET "/"        -> listado de la colección. Controller: getOrganizations. Sin middleware de id.
 * POST "/"       -> crear organización. Controller: createOrganization. Requiere app.use(express.json()) (ya está en index.js).
 * PUT "/:id"     -> actualizar. Controller: updateOrganization. Middleware: validateId (valida el formato del id).
 * DELETE "/:id"  -> eliminar. Controller: deleteOrganization. Middleware: validateId. Depende de la estrategia de borrado acordada.
 */
// router.get("/", getOrganizations);
// router.post("/", createOrganization);
// router.put("/:id", validateId, updateOrganization);
// router.delete("/:id", validateId, deleteOrganization);

// Exporta el router para que pueda ser utilizado en otros archivos, como index.js
module.exports = router;
