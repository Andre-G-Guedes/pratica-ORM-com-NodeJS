const { Router } = require('express')
const MatriculaController =  require('../controller/MatriculaController')

const router =  Router()

router
    .get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaUmaMatricula)
    .get('/pessoas/:estudanteId/matricula', MatriculaController.pegaMatricula)
    .get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculaPorTurma)
    .get('/pessoas/matriculas/lotada', MatriculaController.pegaTurmasLotadas)
    .post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula)
    .post('/pessoas/:id/matricula/restaura', MatriculaController.restauraMatricula)
    .post('/pessoas/:estudanteId/cancela', MatriculaController.cancelaPessoa)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizarMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.apagaMatricula)

module.exports = router