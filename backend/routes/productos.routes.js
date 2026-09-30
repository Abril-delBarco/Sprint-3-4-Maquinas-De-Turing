const express = require("express");
const productos = require("../data/productos");
const router = express.Router();

// GET /api/productos
router.get("/", (req, res) => {
  res.json(productos);
});

// GET /api/productos/:id
router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error); // lo responde el errorHandler de Matias Ismael
  }

  res.json(producto);
});

module.exports = router;
