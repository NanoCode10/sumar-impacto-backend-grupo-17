const express = require("express");
const path = require("path");

const organizationsRoutes = require("./routes/organizationsRoutes");
const campaignsRoutes = require("./routes/campaignsRoutes");

const app = express();
const PORT = 3000;

//Middleware incorporado en Express para parsear el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

// Configuración del motor de plantillas Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Rutas principales
app.use("/organizations", organizationsRoutes);
app.use("/campaigns", campaignsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
