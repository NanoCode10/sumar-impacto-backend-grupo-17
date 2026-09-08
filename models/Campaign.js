/**
 * RESPONSABILIDAD DE LA CLASE
 * Campaign es el Model del dominio "campaña". Se encarga de:
 *  - representar una campaña en memoria (constructor);
 *  - leer y (a futuro) escribir la persistencia en data/campaigns.json;
 *  - ofrecer métodos estáticos de acceso a datos (findById, findAll, create, update, delete);
 *  - garantizar que toda campaña pertenezca a una Organization existente (organizationId válido).
 * La capa de rutas/controllers NO debe leer el JSON directamente: siempre pasa por este Model.
 *
 * ATRIBUTOS DE UNA INSTANCIA
 *  - id             {number}  Identificador único. Lo genera el servidor, nunca el cliente.
 *  - organizationId {number}  Id de la Organization dueña de la campaña. Debe existir en Organization.
 *  - title          {string}  Título de la campaña.
 *  - description    {string}  Descripción de la campaña.
 *  - targetAmount   {number}  Monto objetivo a recaudar.
 *  - status         {string}  Estado de la campaña (ej: "active", "closed").
 *
 * ESTADO DE LOS MÉTODOS
 *  - constructor -> IMPLEMENTADO.
 *  - findById    -> PENDIENTE.
 *  - findAll     -> PENDIENTE.
 *  - create      -> PENDIENTE (además debe validar organizationId contra Organization).
 *  - update      -> PENDIENTE (idem create respecto de organizationId).
 *  - delete      -> PENDIENTE (misma discusión de estrategia que Organization.delete).
 *
 * NOTA: todavía NO se implementa acceso real a data/campaigns.json. Los pasos quedan
 *       descritos como TODO para que el segundo módulo del grupo los desarrolle.
 */
class Campaign {
  constructor(id, organizationId, title, description, targetAmount, status) {
    this.id = id;
    this.organizationId = organizationId;
    this.title = title;
    this.description = description;
    this.targetAmount = targetAmount;
    this.status = status;
  }

  /**
   * Busca una campaña por su id y la devuelve como instancia de Campaign, o null.
   * @param {number} id
   */
  static findById(id) {
    // TODO: definir dataPath con path.join(__dirname, "..", "data", "campaigns.json")
    //       (requerir "fs" y "path" arriba, igual que en Organization.js).
    // TODO: leer el archivo con fs.readFileSync y parsearlo con JSON.parse a un array.
    // TODO: buscar el objeto cuyo id coincide (find).
    // TODO: si no existe, devolver null.
    // TODO: si existe, devolver new Campaign(obj.id, obj.organizationId, obj.title,
    //       obj.description, obj.targetAmount, obj.status).
    throw new Error("TODO: implementar Campaign.findById(id)");
  }

  /**
   * Devuelve TODAS las campañas como array de instancias de Campaign.
   */
  static findAll() {
    // TODO: leer y parsear data/campaigns.json a un array de objetos planos.
    // TODO: recorrer con map y convertir cada objeto en new Campaign(...) con sus 6 campos.
    // TODO: devolver el array de instancias.
    throw new Error("TODO: implementar Campaign.findAll()");
  }

  /**
   * Crea una nueva campaña, la persiste y devuelve el recurso creado.
   * @param {{organizationId: number, title: string, description: string, targetAmount: number, status: string}} data
   */
  static create(data) {
    // TODO: VALIDAR primero que data.organizationId corresponda a una Organization existente:
    //       usar Organization.findById(data.organizationId); si devuelve null, NO persistir
    //       y avisar el error (el controller responderá 400/404 según acuerde el grupo).
    // TODO: leer y parsear data/campaigns.json a un array.
    // TODO: generar el id EN EL SERVIDOR (mayor id + 1, o 1 si está vacío). Ignorar cualquier id del body.
    // TODO: crear new Campaign(nuevoId, data.organizationId, data.title, data.description,
    //       data.targetAmount, data.status).
    // TODO: push al array, JSON.stringify(array, null, 2) y fs.writeFileSync en el dataPath.
    // TODO: devolver la instancia creada.
    throw new Error("TODO: implementar Campaign.create(data)");
  }

  /**
   * Actualiza los campos permitidos de una campaña existente.
   * @param {number} id
   * @param {object} data
   * @returns {Campaign|null} la campaña actualizada, o null si no existe.
   */
  static update(id, data) {
    // TODO: leer y parsear data/campaigns.json a un array.
    // TODO: buscar el índice de la campaña por id (findIndex); si no existe, devolver null.
    // TODO: si "data" trae organizationId, VALIDAR que exista con Organization.findById
    //       antes de aplicar el cambio; si no existe, no persistir y avisar el error.
    // TODO: actualizar solo los campos permitidos: organizationId, title, description,
    //       targetAmount, status. El id se mantiene.
    // TODO: persistir el array completo con JSON.stringify(array, null, 2) + fs.writeFileSync.
    // TODO: devolver una instancia de Campaign con los datos actualizados.
    throw new Error("TODO: implementar Campaign.update(id, data)");
  }

  /**
   * Elimina una campaña.
   * @param {number} id
   */
  static delete(id) {
    // TODO: NO implementar todavía. Usar la MISMA decisión de estrategia que Organization.delete
    //       (física / lógica / por status). Mantener el criterio uniforme en todo el proyecto.
    throw new Error("TODO: implementar Campaign.delete(id) (falta acordar estrategia, igual que Organization.delete)");
  }
}

module.exports = Campaign;
