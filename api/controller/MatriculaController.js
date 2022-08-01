const { MatriculasServices } = require('../services')

const matriculasServices = new MatriculasServices()

class MatriculaController {
    static async pegaUmaMatricula(req,res) {
        const { estudanteId, matriculaId } = req.params
        try{            
            const umaMatricula = await matriculasServices.pegaUmRegistro(Number(estudanteId,matriculaId))
            return res.status(200).json(umaMatricula)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // precisa cria um novo método no matricula service
    static async criaMatricula(req,res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try{            
            const matriculaCriada = await matriculasServices.criaUmRegistro()
            return res.status(200).json(matriculaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // não esta atualizando
    static async atualizarMatricula(req,res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try{
            await matriculasServices.update(novasInfos, { where: { id: Number(matriculaId), estudante_id:Number(estudanteId) }})
            const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req,res) {
        const { matriculaId } = req.params
        try{    
            await matriculasServices.apagaRegistro(Number(matriculaId))
            return res.status(200).json({ mensagem: `matricula ${matriculaId} foi deletado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // precisa cria um método no matricula service
    static async pegaMatricula(req,res) {
        const { estudanteId } = req.params
        try{    
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    } 

    
    static async restauraMatricula(req,res) {
        const { id } = req.params
        try{
            await matriculasServices.restauraRegistro(Number(id))
            return res.status(200).json({mensagem:`id ${id} restaurado` })
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // precisa criar método no matricula service
    static async pegaMatriculaPorTurma(req,res) {
        const { turmaId } = req.params
        try{    
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({ where: { turma_id: Number(turmaId), status: 'confirmado' }, limit:20, order: [['estudante_id','ASC']] })
            return res.status(200).json(todasAsMatriculas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    } 
    // precisa criar método no matricula service
    static async pegaTurmasLotadas(req,res) {
        const lotacaoTurma = 2
        try{    
            const turmasLotadas = await database.Matriculas.findAndCountAll({ where: { status:'confirmado' }, attributes: ['turma_id'], group:['turma_id'], having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) })
            return res.status(200).json(turmasLotadas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    // precisa criar método no matricula service
    static async cancelaPessoa(req,res) {
        const { estudanteId } = req.params
        try{    
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId))
            return res.status(200).json({ message: `Matriculas referente a estudante ${estudanteId} canceladas ` })
            } catch(error) {
            return res.status(500).json(error.message)
        }
    } 
}

module.exports = MatriculaController