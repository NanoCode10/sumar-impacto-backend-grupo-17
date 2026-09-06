const express = require("express");

const organizationsRoutes = require("./routes/organizationsRoutes");

const app = express();
const PORT = 3000;

//Middleware incorporado en Express para parsear el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

// Configuración del motor de plantillas Pug
app.set("view engine", "pug");

// fundamental para montar el Router de organizaciones en la ruta "/organizations"
app.use("/organizations", organizationsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
