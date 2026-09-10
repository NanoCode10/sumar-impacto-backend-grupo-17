const express = require("express");

const validateId = require("../middlewares/validateId");

const { getCampaignById } = require("../controllers/campaignsControllers");

const router = express.Router();

router.get("/:id", validateId, getCampaignById);


module.exports = router;