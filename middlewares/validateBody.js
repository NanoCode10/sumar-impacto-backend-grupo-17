const norm = require("../utils/norm");
const Organization = require("../models/Organization");
const Campaign = require("../models/Campaign");

/**
 * VALIDACIÓN DE LOS DATOS QUE MANDA EL CLIENTE
 * Corre antes del controller: si algo no cumple, responde 400 y el controller
 * no llega a ejecutarse. Valida campos obligatorios, tipos de datos y valores
 * permitidos, que son tres de los cinco puntos que pide la consigna.
 *
 * Cada validador se usa en dos modos:
 *  - "create" (POST): exige los campos obligatorios.
 *  - "update" (PUT): sólo valida los campos que vinieron en el body.
 *
 * Además deja en req.body el VALOR CANÓNICO de cada lista (el de la lista, con
 * su tilde), no lo que escribió el cliente: así en data/*.json hay una sola
 * grafía de cada valor.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const canonical = (value, allowed) => allowed.find((item) => norm(item) === norm(value));

const invalid = (res, message) => res.status(400).json({ error: message });

const missingFields = (body, fields) =>
  fields.filter((field) => body[field] === undefined || body[field] === "");
  /* opción para filtrar también los casos de null y strings con puros espacios como si fueran faltantes:
  fields.filter(
    (field) =>
      body[field] === undefined ||
      body[field] === null ||
      (typeof body[field] === "string" && body[field].trim() === "")
  );*/
//considera los campos faltantes, null, strings vacíos o strings con espacios como faltantes.

function validateOrganization(mode) {
  return (req, res, next) => {
    // Sin express.json() o sin body, req.body es undefined: se trata como objeto vacío
    // para responder 400 en lugar de romper al leer sus propiedades.
    const body = req.body ?? {};

    if (mode === "create") {
      const missing = missingFields(body, ["name", "type", "email"]);
      if (missing.length > 0) {
        return invalid(res, `Faltan campos obligatorios: ${missing.join(", ")}`);
      }
    }

    if (body.name !== undefined) {
      const name = String(body.name).trim();
      if (name.length < 3 || name.length > 100) {
        return invalid(res, "name debe ser un texto de 3 a 100 caracteres");
      }
      body.name = name;
    }

    if (body.email !== undefined) {
      const email = String(body.email).trim();
      if (!EMAIL.test(email)) {
        return invalid(res, "email no tiene un formato válido");
      }
      body.email = email;
    }

    if (body.type !== undefined) {
      const type = canonical(body.type, Organization.TYPES);
      if (!type) {
        return invalid(res, `type inválido. Valores permitidos: ${Organization.TYPES.join(", ")}`);
      }
      body.type = type;
    }

    if (body.status !== undefined) {
      const status = canonical(body.status, Organization.STATUSES);
      if (!status) {
        return invalid(res, `status inválido. Valores permitidos: ${Organization.STATUSES.join(", ")}`);
      }
      body.status = status;
    }

    req.body = body;
    next();
  };
}

function validateCampaign(mode) {
  return (req, res, next) => {
    const body = req.body ?? {};

    if (mode === "create") {
      const missing = missingFields(body, ["title", "description", "targetAmount", "organizationId"]);
      if (missing.length > 0) {
        return invalid(res, `Faltan campos obligatorios: ${missing.join(", ")}`);
      }
    }

    if (body.title !== undefined) {
      const title = String(body.title).trim();
      if (title.length < 5 || title.length > 120) {
        return invalid(res, "title debe ser un texto de 5 a 120 caracteres");
      }
      body.title = title;
    }

    if (body.description !== undefined) {
      const description = String(body.description).trim();
      if (description.length === 0) {
        return invalid(res, "description no puede estar vacía");
      }
      body.description = description;
    }

    if (body.targetAmount !== undefined) {
      const targetAmount = Number(body.targetAmount);
      // Number("abc") da NaN, y JSON lo guarda como null: sin este control el dato
      // quedaba mal grabado sin ningún aviso.
      if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
        return invalid(res, "targetAmount debe ser un número mayor a 0");
      }
      body.targetAmount = targetAmount;
    }

    if (body.organizationId !== undefined) {
      const organizationId = Number(body.organizationId);
      if (!Number.isInteger(organizationId) || organizationId <= 0) {
        return invalid(res, "organizationId debe ser un número entero positivo");
      }
      body.organizationId = organizationId;
    }

    if (body.status !== undefined) {
      const status = canonical(body.status, Campaign.STATUSES);
      if (!status) {
        return invalid(res, `status inválido. Valores permitidos: ${Campaign.STATUSES.join(", ")}`);
      }
      body.status = status;
    }

    req.body = body;
    next();
  };
}

module.exports = { validateOrganization, validateCampaign };
