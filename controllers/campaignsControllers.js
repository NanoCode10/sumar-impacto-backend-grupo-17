const Campaign = require("../models/Campaign");

/**
 * RESPONSABILIDAD DE LA CAPA CONTROLLER
 * El controller traduce entre HTTP y el Model:
 *  - lee lo que llega en req (params, query, body);
 *  - llama al Model correspondiente (Campaign);
 *  - decide el status HTTP y el cuerpo de la respuesta (res);
 *  - NO accede al JSON ni contiene lógica de persistencia (eso es del Model).
 *
 * ESTADO
 *  - getCampaignById  -> IMPLEMENTADO.
 *  - getCampaigns     -> IMPLEMENTADO.
 *  - createCampaign   -> IMPLEMENTADO.
 *  - updateCampaign   -> IMPLEMENTADO.
 *  - deleteCampaign   -> IMPLEMENTADO.
 */

/**
 * GET /campaigns/:id -> muestra una campaña como vista Pug.
 */
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
  const campaigns = Campaign.findAll();
  res.status(200).json(campaigns);
}

/* POST */
function createCampaign(req, res) {
  const { title, description, targetAmount, status, organizationId } = req.body;

  if (!title || !description || !targetAmount || !organizationId) {
    return res.status(400).json({ error: "Título, descripción, monto objetivo y organización son obligatorios" });
  }

  try {
    const newCampaign = Campaign.create({ title, description, targetAmount, status, organizationId });
    res.status(201).json(newCampaign);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

/* PUT */
function updateCampaign(req, res) {
  const id = Number(req.params.id);
  const { title, description, targetAmount, status, organizationId } = req.body;

  try {
    const updatedCampaign = Campaign.update(id, { title, description, targetAmount, status, organizationId });

    if (!updatedCampaign) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }
    res.status(200).json(updatedCampaign);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

/* DELETE */
function deleteCampaign(req, res) {
  const id = Number(req.params.id);
  const deletedCampaign = Campaign.delete(id);

  if (!deletedCampaign) {
    return res.status(404).json({ error: "Campaña no encontrada" });
  }

  res.status(200).json({ message: "Campaña eliminada correctamente", campaign: deletedCampaign });
}

module.exports = { getCampaignById, getCampaigns, createCampaign, updateCampaign, deleteCampaign };
