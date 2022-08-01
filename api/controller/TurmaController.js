const { Op } = require('sequelize')
const database = require('../models')
const { TurmasServices } = require('../services')

class TurmaController {

    static async pegaTodasAsTurmas(req,res) {
        try{
            const { data_inicial, data_final } = req.query
            const where = {}
            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null
            const todasAsTurmas = await database.Turmas.findAll({ where })
            return res.status(200).json(todasAsTurmas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }    

    static async pegaUmaTurma(req,res) {
        const { id } = req.params
        try{            
            const umaTurma = await TurmasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaTurma)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaUmaTurma(req,res) {
        const novaTurma = req.body
        try{
         const turmaCriada =  await TurmasServices.criaUmRegistro(novaTurma)
         return res.status(200).json(turmaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // não esta atualizando
    static async atualizaTurma(req,res) {
        const { id } = req.params
        const novasInfos = req.body
        try{
            await database.Turmas.update(novasInfos,{ where: { id:Number(id) } })
            const turmaAtualizada = await database.Turmas.findOne({ where: {id:Number(id)} })
            return res.status(200).json(turmaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req,res) {
        const { id } = req.params
        try{
            await TurmasServices.apagaRegistro(Number(id))
            return res.status(200).json({mensagem:`turma ${id} deletada` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTumra(req,res) {
        const { id } = req.params
        try{
            await TurmasServices.restauraRegistro(Number(id))
            return res.status(200).json({mensagem:`id ${id} restaurado` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports =TurmaController