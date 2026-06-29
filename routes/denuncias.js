const express = require("express");
const router = express.Router();
const denunciaController = require("../controllers/denunciaController");

// POST - Criar nova denúncia
router.post("/", denunciaController.criarDenuncia);

// GET - Listar todas as denúncias
router.get("/", denunciaController.listarDenuncias);

// GET - Consultar denúncia pelo protocolo
router.get("/:protocolo", denunciaController.consultarDenuncia);

// PUT - Atualizar status da denúncia
router.put("/:protocolo/status", denunciaController.atualizarStatus);

module.exports = router;