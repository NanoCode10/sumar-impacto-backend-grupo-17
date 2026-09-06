function validateId(req, res, next) {

  // Extrae el id de los parámetros de la solicitud
  const { id } = req.params;

  // Verifica si el id es un número entero positivo utilizando una expresión regular 
  if (!/^[1-9]\d*$/.test(id)) {
    return res.status(400).json({ error: "El id debe ser un número entero positivo" });
  }
  // Si el id es válido, llama a next() para pasar al siguiente middleware o controlador
  next();
}

module.exports = validateId;
