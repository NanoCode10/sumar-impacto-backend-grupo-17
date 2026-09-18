const { test } = require("node:test");
const assert = require("node:assert/strict");

const { validateOrganization } = require("../middlewares/validateBody");

function ejecutarValidador(body, mode = "create") {
  const req = { body };
  let respuesta;
  let siguienteLlamado = false;

  const res = {
    status(codigo) {
      respuesta = { codigo };
      return this;
    },
    json(data) {
      respuesta.body = data;
      return this;
    }
  };

  const next = () => {
    siguienteLlamado = true;
  };

  validateOrganization(mode)(req, res, next);

  return {
    req,
    respuesta,
    siguienteLlamado
  };
}

test("acepta una organización válida", () => {
  const resultado = ejecutarValidador({
    name: "Fundación Verde",
    type: "fundacion",
    email: "contacto@verde.org",
    status: "aprobada"
  });

  assert.equal(resultado.siguienteLlamado, true);
  assert.equal(resultado.respuesta, undefined);
  assert.equal(resultado.req.body.type, "fundación");
  assert.equal(resultado.req.body.status, "aprobada");
});

test("rechaza una organización sin campos obligatorios", () => {
  const resultado = ejecutarValidador({
    name: "Fundación Verde"
  });

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un email inválido", () => {
  const resultado = ejecutarValidador({
    name: "Fundación Verde",
    type: "ONG",
    email: "correo-invalido"
  });

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un tipo de organización inválido", () => {
  const resultado = ejecutarValidador({
    name: "Fundación Verde",
    type: "empresa",
    email: "contacto@verde.org"
  });

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});


