const express = require('express')
const routes = require('./rotas')

const app = express()
const port = 3000

routes(app)

app.listen(port,() => console.log(`Api funcionando na porta ${port}`))

module.exports = app