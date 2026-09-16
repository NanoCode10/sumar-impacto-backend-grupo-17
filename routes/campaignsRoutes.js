const express = require("express");

const validateId = require("../middlewares/validateId");
const { validateCampaign } = require("../middlewares/validateBody");
const { validateCampaignQuery } = require("../middlewares/validateQuery");

const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require("../controllers/campaignsController");

const router = express.Router();

// Rutas de la API del recurso, montadas en /api/campaigns (ver index.js)
router.get("/", validateCampaignQuery, getCampaigns);
router.post("/", validateCampaign("create"), createCampaign);
router.get("/:id", validateId, getCampaignById);
router.put("/:id", validateId, validateCampaign("update"), updateCampaign);
router.delete("/:id", validateId, deleteCampaign);

module.exports = router;
