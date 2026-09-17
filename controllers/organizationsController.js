const Organization = require("../models/Organization");
const Campaign = require("../models/Campaign");

/**
 * RESPONSABILIDAD DE LA CAPA CONTROLLER
 * El controller traduce entre HTTP y el Model:
 *  - lee lo que llega en req (params, query, body);
 *  - llama al Model correspondiente (Organization);
 *  - decide el status HTTP y el cuerpo de la respuesta (res);
 *  - NO accede al JSON ni contiene lógica de persistencia (eso es del Model).
 *
 * Los campos obligatorios, los tipos y los valores permitidos los controla antes
 * middlewares/validate.js, que además deja en req.body el valor canónico.
 *
 * Las funciones get* responden JSON (API, bajo /api). renderOrganization responde
 * HTML y la usa routes/viewsRoutes.js.
 */

/**
 * GET /api/organizations  -> listado, con filtros opcionales por type y status.
 * Los filtros los valida y canoniza validateQuery, que los deja en req.filtros.
 */
function getOrganizations(req, res) {
  const organizations = Organization.findAll(req.filtros);
  res.status(200).json(organizations);
}

/**
 * GET /api/organizations/:id/campaigns  -> las campañas de una organización.
 */
function getOrganizationCampaigns(req, res) {
  const id = Number(req.params.id);
  const organization = Organization.findById(id);

  if (!organization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }

  res.status(200).json(Campaign.findAll({ organizationId: id }));
}

/**
 * GET /api/organizations/:id  -> una organización en JSON.
 */
function getOrganizationById(req, res) {
  const id = Number(req.params.id);
  const organization = Organization.findById(id);

  if (!organization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }

  res.status(200).json(organization);
}

/**
 * GET /organizations/:id  -> la misma organización, como página Pug.
 */
function renderOrganization(req, res) {
  const id = Number(req.params.id);
  const organization = Organization.findById(id);

  if (!organization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }

  res.render("organization", { organization });
}

/**
 * POST /api/organizations  -> crea una organización.
 */
function createOrganization(req, res) {
  const { name, type, email, status } = req.body;

  const newOrganization = Organization.create({ name, type, email, status });
  res.status(201).json(newOrganization);
}

/**
 * PUT /api/organizations/:id  -> actualiza una organización existente.
 */
function updateOrganization(req, res) {
  const id = Number(req.params.id);
  const { name, type, email, status } = req.body;

  const updatedOrganization = Organization.update(id, { name, type, email, status });

  if (!updatedOrganization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }

  res.status(200).json(updatedOrganization);
}

/**
 * DELETE /api/organizations/:id  -> elimina una organización.
 */
function deleteOrganization(req, res, next) {
  const id = Number(req.params.id);

  try {
    const deletedOrganization = Organization.delete(id);

    if (!deletedOrganization) {
      return res.status(404).json({ error: "Organización no encontrada" });
    }

    res.status(200).json({ message: "Organización eliminada correctamente", organization: deletedOrganization });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getOrganizations,
  getOrganizationCampaigns,
  getOrganizationById,
  renderOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization
};
