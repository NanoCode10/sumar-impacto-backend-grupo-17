const express = require("express");

const validateId = require("../middlewares/validateId");
const Organization = require("../models/Organization");
const Campaign = require("../models/Campaign");
const { renderOrganization } = require("../controllers/organizationsController");
const { renderCampaign } = require("../controllers/campaignsControllers");

/**
 * Páginas HTML generadas con Pug. Son las únicas rutas que usan res.render;
 * la API vive bajo /api y siempre responde JSON.
 */
const router = express.Router();

router.get("/", (req, res) => {
  const organizations = Organization.findAll();
  const campaigns = Campaign.findAll();
  res.render("home", { title: "SumarImpacto", organizations, campaigns });
});

router.get("/organizations/:id", validateId, renderOrganization);
router.get("/campaigns/:id", validateId, renderCampaign);

module.exports = router;
