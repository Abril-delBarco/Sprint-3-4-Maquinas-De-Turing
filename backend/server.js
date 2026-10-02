const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const productosRouter = require("./routes/productos.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/productos", productosRouter);
app.use(notFound); 
app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto localhost:${PORT}`);
});