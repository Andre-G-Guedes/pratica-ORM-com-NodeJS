const { Router } = require('express')
const TurmaController = require('../controller/TurmaController')

const router = Router()

router
    .get('/turmas', TurmaController.pegaTodasAsTurmas)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .post('/turmas', TurmaController.criaUmaTurma)
    .put('/turmas/:id', TurmaController.atualizaTurma)
    .delete('/turmas/:id', TurmaController.apagaTurma)
    .post('/turmas/:id/restaura', TurmaController.restauraTumra)

module.exports = router