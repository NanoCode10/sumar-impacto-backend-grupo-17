const { test } = require("node:test");
const assert = require("node:assert/strict");

const validateId = require("../middlewares/validateId");

function ejecutarValidador(id) {
  const req = {
    params: { id }
  };
  let respuesta;
  let siguienteLlamado = false;

  const res = {
    status(codigo) {
      respuesta = { codigo };
      return this;
    },
    json(body) {
      respuesta.body = body;
      return this;
    }
  };

  const next = () => {
    siguienteLlamado = true;
  };

  validateId(req, res, next);

  return { respuesta, siguienteLlamado };
}

test("acepta un ID entero positivo", () => {
  const resultado = ejecutarValidador("1");

  assert.equal(resultado.siguienteLlamado, true);
  assert.equal(resultado.respuesta, undefined);
});

test("rechaza el ID cero", () => {
  const resultado = ejecutarValidador("0");

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID negativo", () => {
  const resultado = ejecutarValidador("-1");

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID decimal", () => {
  const resultado = ejecutarValidador("1.5");

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID con letras", () => {
  const resultado = ejecutarValidador("abc");

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID vacío", () => {
  const resultado = ejecutarValidador("");

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});