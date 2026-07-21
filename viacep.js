const express = require('express');
const router = express.Router();
const ViaCEPController = require('../controllers/ViaCEPController');

// Rota GET - Exibe o formulário
router.get('/', ViaCEPController.index);

// Rota POST - Processa a busca de CEP
router.post('/buscar', ViaCEPController.buscar);

module.exports = router;
