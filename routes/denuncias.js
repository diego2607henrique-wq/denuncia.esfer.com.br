const express = require("express");
const router = express.Router();
const denunciaController = require("../controllers/denunciaController");

// POST - Criar nova denúncia
router.post("/", denunciaController.criarDenuncia);

// GET - Consultar denúncia pelo protocolo
router.get("/:protocolo", denunciaController.consultarDenuncia);

module.exports = router;