const express = require("express");

const validateId = require("../middlewares/validateId");

const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignsControllers");

const router = express.Router();

// Define las rutas para el recurso /campaigns
router.get("/", getCampaigns);
router.post("/", createCampaign);
router.get("/:id", validateId, getCampaignById);
router.put("/:id", validateId, updateCampaign);
router.delete("/:id", validateId, deleteCampaign);

module.exports = router;