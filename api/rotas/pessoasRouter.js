const { Router } = require('express')
const PessoaController = require('../controller/PessoaController')

const router = Router()

router
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)    
    .post('/pessoas', PessoaController.criaPessoa)   
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)    
    .put('/pessoas/:id', PessoaController.atualizarPessoa)    
    .delete('/pessoas/:id', PessoaController.apagaPessoa)    

module.exports = router