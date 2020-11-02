// Models
const mTip = require('../models').Tipos
const mPes = require('../models').Pessoas
const mEnd = require('../models').Enderecos
const mFis = require('../models').PessoaFis
const mJur = require('../models').PessoaJurs
const mTit = require('../models').Titulos

// // Attributes
const aTip = [ 'tipo' ]
const aJur = [ 'cnpj', 'inscEst', 'inscMun' ]
const aFis = [ 'cpf', 'rg', 'orgao', 'expedicao' ]
const aPes = [ ['id', 'idPessoa'], 'codigo', ['nome', 'nome_razaoSocial'] ]
const aEnd = [ 'logradoro', 'numero', 'bairro', 'complemento', 'cidade', 'uf', 'cep' ]
const aTit = [ ['numero', 'numTitulo'], ['situacao', 'sitTitulo'], 'lancto', 'vencto', 'liquido', 'pessoaId' ]

// Include
const iTip = { model: mTip, attributes: aTip, as: 'Tip' }
const iFis = { model: mFis, attributes: aFis, as: 'Fis' }
const iJur = { model: mJur, attributes: aJur, as: 'Jur' }
const iEnd = { model: mEnd, attributes: aEnd, as: 'End' }
const iPes = { model: mPes, attributes: aPes, as: 'Pes', include: [ iTip, iFis, iJur, iEnd ] }

// Ordenação
const ordId = ['id', 'asc']

// Comando Queries
const sTit = { raw: true, attributes: aTit, include: [ iPes ], order: [ ordId ]}

/**** Lista de Registros ****/ 

exports.listTit = (req, res) => {

  mTit.findAll(sTit).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

//**** Inclui Novo Registro na Tabela ****//

exports.criaTit = (req, res) => {

  //Cast JSON para Variaveis
  var { numTitulo, sitTitulo, lancto, vencto, liquido, pessoaId} = req.body

  //
  whr = {numero: numTitulo}

  const wTit = { raw: true, attributes: aTit, include: [ iPes ], where: whr, order: [ ordId ]}

  numero = numTitulo
  situacao = sitTitulo

  //Cast Variáveis para JSON
  dad = { numero, situacao, lancto, vencto, liquido, pessoaId}

  //Cria e Salva um Novo Registro na Tabela.
  mTit.create(dad).then(Ret => {
    mTit.findOne(wTit).then(Ret => {
      res.send(Ret)
      console.table(Ret)
    })
  })
}
