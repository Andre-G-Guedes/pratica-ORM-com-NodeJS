// const database = require('../models')
// const Sequelize = require('sequelize')
const { PessoasServices } = require('../services')

const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req,res) {
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch(error) {
            res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req,res) {
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch(error) {
            res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req,res) {
        const { id } = req.params
        try{            
            const umaPessoa = await pessoasServices.pegaUmIdPessoa(Number(id))
            return res.status(200).json(umaPessoa)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req,res) {
        const novaPessoa = req.body
        try{            
            const pessoaCriada = await pessoasServices.criaUmRegistro(novaPessoa)
            return res.status(200).json(pessoaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // Não esta atualizando
    static async atualizarPessoa(req,res) {
        const { id } = req.params
        const novasInfos = req.body
        try{
            await pessoasServices.atualizaRegistro(novasInfos,Number(id))           
            return res.status(200).json({message:'Pessoa Atualizada'})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req,res) {
        const { id } = req.params
        try{    
            await pessoasServices.apagaRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} foi deletado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req,res) {
        const { id } = req.params
        try{
            await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json({mensagem:`id ${id} restaurado` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    } 
}

module.exports = PessoaController