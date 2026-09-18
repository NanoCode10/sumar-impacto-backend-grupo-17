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

function mostrarResultado(nombre, entrada, resultado) {
  console.log(`\n${nombre}`);
  console.log("ID ingresado:", JSON.stringify(entrada));
  console.log("Status retornado:", resultado.respuesta?.codigo ?? "sin respuesta");
  console.log("JSON retornado:", JSON.stringify(resultado.respuesta?.body ?? null));
  console.log("¿Se llamó a next()?:", resultado.siguienteLlamado);
}

test("acepta un ID entero positivo", () => {
  const entrada = "1";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID entero positivo", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, true);
  assert.equal(resultado.respuesta, undefined);
});

test("acepta un ID entero positivo mayor", () => {
  const entrada = "250";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID entero positivo mayor", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, true);
  assert.equal(resultado.respuesta, undefined);
});

test("rechaza el ID cero", () => {
  const entrada = "0";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID cero", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID negativo", () => {
  const entrada = "-1";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID negativo", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID decimal", () => {
  const entrada = "1.5";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID decimal", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID con letras", () => {
  const entrada = "abc";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID con letras", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID vacío", () => {
  const entrada = "";
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID vacío", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID null", () => {
  const entrada = null;
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID null", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});

test("rechaza un ID undefined", () => {
  const entrada = undefined;
  const resultado = ejecutarValidador(entrada);
  mostrarResultado("ID undefined", entrada, resultado);

  assert.equal(resultado.siguienteLlamado, false);
  assert.equal(resultado.respuesta.codigo, 400);
});