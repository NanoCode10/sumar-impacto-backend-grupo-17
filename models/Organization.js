const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "organizations.json");

/**
 * RESPONSABILIDAD DE LA CLASE
 * Organization es el Model del dominio "organización". Se encarga de:
 *  - representar una organización en memoria (constructor);
 *  - leer y (a futuro) escribir la persistencia en data/organizations.json;
 *  - ofrecer métodos estáticos de acceso a datos (findById, findAll, create, update, delete).
 * La capa de rutas/controllers NO debe leer el JSON directamente: siempre pasa por este Model.
 *
 * ATRIBUTOS DE UNA INSTANCIA
 *  - id     {number}  Identificador único. Lo genera el servidor, nunca el cliente.
 *  - name   {string}  Nombre de la organización.
 *  - type   {string}  Tipo/categoría de la organización (ej: "ONG", "fundación").
 *  - email  {string}  Email de contacto.
 *  - status {string}  Estado de la organización (ej: "active", "inactive").
 *
 * ESTADO DE LOS MÉTODOS
 *  - constructor  -> IMPLEMENTADO y funcionando.
 *  - findById     -> IMPLEMENTADO y funcionando (solo lectura).
 *  - findAll      -> IMPLEMENTADO y funcionando.
 *  - create       -> IMPLEMENTADO y funcionando.
 *  - update       -> IMPLEMENTADO y funcionando.
 *  - delete       -> IMPLEMENTADO y funcionando.
 */
class Organization {
  /**
   * Valores permitidos del dominio. Se escriben acá una sola vez y el resto del
   * código los referencia (middlewares/validate.js), para que no convivan dos
   * grafías del mismo valor.
   */
  static TYPES = ["ONG", "fundación", "comedor"];
  static STATUSES = ["pendiente", "aprobada", "suspendida", "baja"];

  constructor(id, name, type, email, status) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.email = email;
    this.status = status;
  }

  static findById(id) {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    const found = organizations.find((org) => org.id === id);

    if (!found) {
      return null;
    }

    return new Organization(found.id, found.name, found.type, found.email, found.status);
  }

  /**
   * Devuelve TODAS las organizaciones como array de instancias de Organization.
   */
  static findAll() {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    return organizations.map(
      (org) => new Organization(org.id, org.name, org.type, org.email, org.status)
    );
  }

  /**
   * Crea una nueva organización, la persiste y devuelve el recurso creado.
   * @param {{name: string, type: string, email: string, status: string}} data
   */
  static create(data) {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    const maxId = organizations.reduce((max, org) => (org.id > max ? org.id : max), 0);
    const newId = maxId + 1;

    const newOrg = new Organization(
      newId,
      data.name,
      data.type,
      data.email,
      data.status || "pendiente"
    );

    organizations.push(newOrg);
    fs.writeFileSync(dataPath, JSON.stringify(organizations, null, 2), "utf-8");

    return newOrg;
  }

  /**
   * Actualiza los campos permitidos de una organización existente.
   * @param {number} id
   * @param {{name?: string, type?: string, email?: string, status?: string}} data
   * @returns {Organization|null} la organización actualizada, o null si no existe.
   */
  static update(id, data) {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    const index = organizations.findIndex((org) => org.id === id);
    if (index === -1) {
      return null;
    }

    if (data.name !== undefined) organizations[index].name = data.name;
    if (data.type !== undefined) organizations[index].type = data.type;
    if (data.email !== undefined) organizations[index].email = data.email;
    if (data.status !== undefined) organizations[index].status = data.status;

    fs.writeFileSync(dataPath, JSON.stringify(organizations, null, 2), "utf-8");

    const updated = organizations[index];
    return new Organization(updated.id, updated.name, updated.type, updated.email, updated.status);
  }

  /**
   * Elimina una organización.
   * @param {number} id
   */
  static delete(id) {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const organizations = JSON.parse(rawData);

    const index = organizations.findIndex((org) => org.id === id);
    if (index === -1) {
      return null;
    }

    const [deletedOrg] = organizations.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(organizations, null, 2), "utf-8");

    return new Organization(deletedOrg.id, deletedOrg.name, deletedOrg.type, deletedOrg.email, deletedOrg.status);
  }
}

module.exports = Organization;
