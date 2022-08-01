const { Router } = require('express')
const NivelController = require('../controller/NivelController')

const router = Router()

router
    .get('/niveis', NivelController.pegaTodosOsNiveis)
    .get('/niveis/:id', NivelController.pegaUmNivel)
    .post('/niveis', NivelController.criaUmNivel)
    .put('/niveis/:id', NivelController.atualizaUmNivel)
    .delete('/niveis/:id', NivelController.apagaUmNivel)
    .post('/niveis/:id/restaura',NivelController.restauraNivel)

module.exports = router