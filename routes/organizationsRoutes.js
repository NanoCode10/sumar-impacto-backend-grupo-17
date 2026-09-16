const express = require("express");

// import Middlewares
const validateId = require("../middlewares/validateId");
const { validateOrganization } = require("../middlewares/validateBody");
const { validateOrganizationQuery } = require("../middlewares/validateQuery");

// import Controllers
const {
  getOrganizations,
  getOrganizationCampaigns,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization
} = require("../controllers/organizationsController");

// Create a new router instance
const router = express.Router();

// Rutas de la API del recurso, montadas en /api/organizations (ver index.js)
router.get("/", validateOrganizationQuery, getOrganizations);
router.post("/", validateOrganization("create"), createOrganization);
router.get("/:id", validateId, getOrganizationById);
router.get("/:id/campaigns", validateId, getOrganizationCampaigns);
router.put("/:id", validateId, validateOrganization("update"), updateOrganization);
router.delete("/:id", validateId, deleteOrganization);

// Exporta el router para que pueda ser utilizado en otros archivos, como index.js
module.exports = router;
