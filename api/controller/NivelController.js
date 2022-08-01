// const database = require('../models')
const { NiveisServices } = require('../services')

const niveisServices = new NiveisServices()

class NivelController {

    static async pegaTodosOsNiveis(req,res) {
        try{
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            return res.status(200).json(todosOsNiveis)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    } 

    static async pegaUmNivel(req,res) {
        const { id } = req.params
        try{            
            const umNivel = await niveisServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umNivel)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaUmNivel(req,res) {
        const novoNivel = req.body
        try{            
            const nivelCriado = await niveisServices.criaUmRegistro(novoNivel)
            return res.status(200).json(nivelCriado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // não esta atualizando
    static async atualizaUmNivel(req,res) {
        const { id } = req.params
        const novasInfos = req.body
        try{            
            await database.Niveis.update(novasInfos,{ where: { id:Number(id) } })
            const nivelAtualizado = await database.Niveis.findOne({ where: { id:Number(id) } })
            return res.status(200).json(nivelAtualizado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaUmNivel(req,res) {
        const { id } = req.params
        try{
            await niveisServices.apagaRegistro(Number(id))
            res.status(200).json({mensagem: `Nivel ${id} foi deletado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraNivel(req,res) {
        const { id } = req.params
        try{
            await niveisServices.restauraRegistro(Number(id))
            return res.status(200).json({mensagem:`id ${id} restaurado` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController