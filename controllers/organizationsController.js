const Organization = require("../models/Organization");

/**
 * RESPONSABILIDAD DE LA CAPA CONTROLLER
 * El controller traduce entre HTTP y el Model:
 *  - lee lo que llega en req (params, query, body);
 *  - llama al Model correspondiente (Organization);
 *  - decide el status HTTP y el cuerpo de la respuesta (res);
 *  - NO accede al JSON ni contiene lógica de persistencia (eso es del Model).
 *
 * ESTADO
 *  - getOrganizationById -> IMPLEMENTADO.
 *  - getOrganizations    -> IMPLEMENTADO.
 *  - createOrganization  -> IMPLEMENTADO.
 *  - updateOrganization  -> IMPLEMENTADO.
 *  - deleteOrganization  -> IMPLEMENTADO.
 */

function getOrganizationById(req, res) {
  // Extrae el id de los parámetros de la solicitud y lo convierte a número
  const id = Number(req.params.id);

  // Busca la organización en la base de datos utilizando el modelo Organization y el id proporcionado
  const organization = Organization.findById(id);

  // Si no se encuentra la organización, devuelve un error 404 con un mensaje adecuado
  if (!organization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }
  // Si se encuentra la organización, renderiza la vista "organization" pasando la organización como contexto
  res.render("organization", { organization });
}

/**
 * GET /organizations  -> listado de todas las organizaciones.
 */
function getOrganizations(req, res) {
  const organizations = Organization.findAll();
  res.status(200).json(organizations);
}

/**
 * POST /organizations  -> crea una organización.
 */
function createOrganization(req, res) {
  const { name, type, email, status } = req.body;

  if (!name || !type || !email) {
    return res.status(400).json({ error: "Nombre, tipo y email son campos obligatorios" });
  }

  const newOrganization = Organization.create({ name, type, email, status });
  res.status(201).json(newOrganization);
}

/**
 * PUT /organizations/:id  -> actualiza una organización existente.
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
 * DELETE /organizations/:id  -> elimina una organización.
 */
function deleteOrganization(req, res) {
  const id = Number(req.params.id);

  const deletedOrganization = Organization.delete(id);

  if (!deletedOrganization) {
    return res.status(404).json({ error: "Organización no encontrada" });
  }

  res.status(200).json({ message: "Organización eliminada correctamente", organization: deletedOrganization });
}

module.exports = {
  getOrganizationById,
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
};
