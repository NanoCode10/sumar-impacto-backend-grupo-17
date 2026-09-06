const express = require("express");

// import Middlewares
const validateId = require("../middlewares/validateId");

// import Controllers
const { getOrganizationById } = require("../controllers/organizationsController");

// Create a new router instance
const router = express.Router();

// Define la ruta dinamica para obtener una organización por su ID, aplicando el middleware validateId antes de llamar al controlador getOrganizationById
router.get("/:id", validateId, getOrganizationById);

// Exporta el router para que pueda ser utilizado en otros archivos, como index.js
module.exports = router;
