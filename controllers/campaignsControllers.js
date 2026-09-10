const Campaign = require("../models/Campaign");

function getCampaignById(req, res) {
  const id = Number(req.params.id);

  const campaign = Campaign.findById(id);

  if (!campaign) {
    return res.status(404).json({ error: "Campaña no encontrada" });
  }
  res.render("campaign", { campaign });
}
/* GET */
function getCampaigns(req, res) {
  throw new Error("TODO: implementar getCampaigns(req, res)");
}

/* POST */
function createCampaign(req, res) {
  throw new Error("TODO: implementar createCampaign(req, res)");
}

/* PUT*/
function updateCampaign(req, res) {
  throw new Error("TODO: implementar updateCampaign(req, res)");
}

/* DELETE */
function deleteCampaign(req, res) {
  throw new Error("TODO: implementar deleteCampaign(req, res)");
}
module.exports = { getCampaignById, getCampaigns, createCampaign, updateCampaign, deleteCampaign };