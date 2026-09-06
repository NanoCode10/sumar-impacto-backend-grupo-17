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
 *  - getOrganizationById -> IMPLEMENTADO y funcionando. NO modificar.
 *  - getOrganizations    -> PENDIENTE (esqueleto abajo).
 *  - createOrganization  -> PENDIENTE (esqueleto abajo).
 *  - updateOrganization  -> PENDIENTE (esqueleto abajo).
 *  - deleteOrganization  -> PENDIENTE (esqueleto abajo).
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
  // TODO: no recibe nada especial de req (a futuro podría aceptar filtros en req.query).
  // TODO: llamar a Organization.findAll() para obtener el array de instancias.
  // TODO: responder 200 con res.json(organizations)
  //       (o res.render(...) si el grupo decide devolver HTML en lugar de JSON).
  throw new Error("TODO: implementar getOrganizations(req, res)");
}

/**
 * POST /organizations  -> crea una organización.
 */
function createOrganization(req, res) {
  // TODO: leer los datos de req.body: name, type, email, status.
  //       IGNORAR cualquier id que venga en el body (el id lo genera el Model).
  // TODO: (opcional, a acordar) validar que los campos obligatorios estén presentes;
  //       si faltan, responder 400 con un mensaje de error.
  // TODO: llamar a Organization.create({ name, type, email, status }).
  // TODO: responder 201 con res.json(organizationCreada).
  throw new Error("TODO: implementar createOrganization(req, res)");
}

/**
 * PUT /organizations/:id  -> actualiza una organización existente.
 */
function updateOrganization(req, res) {
  // TODO: obtener el id con Number(req.params.id) (la validación de formato la hará el middleware validateId).
  // TODO: leer los campos a actualizar de req.body: name, type, email, status.
  // TODO: llamar a Organization.update(id, data).
  // TODO: si el Model devuelve null -> responder 404 (recurso inexistente).
  // TODO: si devuelve la organización actualizada -> responder 200 con res.json(organization).
  throw new Error("TODO: implementar updateOrganization(req, res)");
}

/**
 * DELETE /organizations/:id  -> elimina una organización.
 */
function deleteOrganization(req, res) {
  // TODO: obtener el id con Number(req.params.id).
  // TODO: NO implementar hasta que el grupo defina la estrategia de eliminación
  //       (ver Organization.delete: física / lógica / por status).
  // TODO: según la estrategia, la respuesta será 204 (sin cuerpo) o 200 con el recurso afectado.
  // TODO: contemplar el caso de id inexistente -> responder 404.
  throw new Error("TODO: implementar deleteOrganization(req, res)");
}

// NOTA: por ahora SOLO se exporta getOrganizationById, que es lo único conectado a una ruta.
// Los esqueletos getOrganizations / createOrganization / updateOrganization / deleteOrganization
// quedan definidos y documentados en este archivo pero SIN exportar, para dejar explícito
// que son trabajo PENDIENTE y evitar que se enganchen al router por error.
// TODO: al implementar cada uno, agregarlo a module.exports y recién ahí conectarlo en routes/organizationsRoutes.js.
module.exports = { getOrganizationById };
