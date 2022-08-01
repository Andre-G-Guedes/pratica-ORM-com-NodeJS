const bodyParser = require('body-parser')

const pessoas = require('./pessoasRouter')
const niveis = require('./niveisRouter')
const turmas = require('./turmasRouter')
const matricula = require('./matriculasRouter')

module.exports = app => {
    app.use(bodyParser.json(),
    bodyParser.urlencoded({extended: false }),
    pessoas,
    niveis,
    turmas,
    matricula
    )    
}