const Organization = require("../models/Organization");

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

module.exports = { getOrganizationById };
