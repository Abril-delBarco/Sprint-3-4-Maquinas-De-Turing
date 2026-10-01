const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(["Lista de productos"]);
});

module.exports = router;