const express = require("express");

// import Middlewares
const validateId = require("../middlewares/validateId");

// import Controllers
const {
  getOrganizationById,
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
} = require("../controllers/organizationsController");

// Create a new router instance
const router = express.Router();

// Define las rutas para el recurso /organizations
router.get("/", getOrganizations);
router.post("/", createOrganization);
router.get("/:id", validateId, getOrganizationById);
router.put("/:id", validateId, updateOrganization);
router.delete("/:id", validateId, deleteOrganization);

// Exporta el router para que pueda ser utilizado en otros archivos, como index.js
module.exports = router;
