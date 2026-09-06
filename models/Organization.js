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
 *  - findAll      -> PENDIENTE.
 *  - create       -> PENDIENTE.
 *  - update       -> PENDIENTE.
 *  - delete       -> PENDIENTE (falta acordar estrategia de eliminación).
 */
class Organization {
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
    // TODO: leer el archivo data/organizations.json con fs.readFileSync(dataPath, "utf-8").
    // TODO: parsear el contenido con JSON.parse para obtener un array de objetos planos.
    // TODO: recorrer ese array (map) y convertir cada objeto plano en una instancia
    //       new Organization(obj.id, obj.name, obj.type, obj.email, obj.status).
    // TODO: devolver el array de instancias resultante.
    // TODO: si el archivo pudiera no existir, definir con el grupo qué hacer
    //       (por ahora asumimos que siempre existe, igual que en findById).
    throw new Error("TODO: implementar Organization.findAll()");
  }

  /**
   * Crea una nueva organización, la persiste y devuelve el recurso creado.
   * @param {{name: string, type: string, email: string, status: string}} data
   */
  static create(data) {
    // TODO: leer data/organizations.json y parsearlo a un array (igual que en findAll).
    // TODO: generar el nuevo id EN EL SERVIDOR (ej: mayor id existente + 1, o 1 si está vacío).
    // TODO: NO usar ningún id que venga en "data" / en el body del request: se ignora por seguridad.
    // TODO: crear la instancia new Organization(nuevoId, data.name, data.type, data.email, data.status).
    // TODO: agregar la nueva organización al array (push).
    // TODO: serializar el array completo con JSON.stringify(array, null, 2) para que quede legible.
    // TODO: escribir el resultado en dataPath con fs.writeFileSync.
    // TODO: devolver la instancia recién creada (el recurso creado).
    throw new Error("TODO: implementar Organization.create(data)");
  }

  /**
   * Actualiza los campos permitidos de una organización existente.
   * @param {number} id
   * @param {{name?: string, type?: string, email?: string, status?: string}} data
   * @returns {Organization|null} la organización actualizada, o null si no existe.
   */
  static update(id, data) {
    // TODO: leer y parsear data/organizations.json a un array.
    // TODO: buscar el índice de la organización cuyo id coincide (findIndex).
    // TODO: si no se encuentra, devolver null (el controller responderá 404).
    // TODO: actualizar SOLO los campos permitidos: name, type, email, status.
    //       El id NO se toca: se mantiene el original.
    // TODO: volver a persistir el array completo con JSON.stringify(array, null, 2) + fs.writeFileSync.
    // TODO: devolver una instancia de Organization con los datos ya actualizados.
    throw new Error("TODO: implementar Organization.update(id, data)");
  }

  /**
   * Elimina una organización.
   * @param {number} id
   */
  static delete(id) {
    // TODO: NO implementar todavía. Primero el grupo debe acordar la ESTRATEGIA de eliminación:
    //   a) eliminación física: sacar el objeto del array y persistir el JSON sin ese registro;
    //   b) eliminación lógica: mantener el registro pero marcarlo (ej: deleted: true);
    //   c) mediante status: cambiar status a "inactive" / "archived" y no borrar nada.
    // TODO: cada opción impacta a findById/findAll (¿deben seguir devolviendo los eliminados?).
    // TODO: definir también qué pasa con las Campaign asociadas a esa Organization.
    // TODO: recién cuando haya decisión de equipo, implementar aquí la opción elegida.
    throw new Error("TODO: implementar Organization.delete(id) (falta acordar estrategia: física / lógica / por status)");
  }
}

module.exports = Organization;
