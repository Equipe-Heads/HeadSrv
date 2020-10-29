const mPes = require('../models').Pessoas
const mTip = require('../models').Tipos
const mEnd = require('../models').Enderecos
const mPnt = require('../models').Pontos

const aTip = [ 'tipo' ]
const aPnt = [ 'situacao', 'qrcode' ]
const aUsu = [ 'id', 'nome', 'codigo', 'tipoId' ]
const aPes = [ 'cep', 'numero', 'complemento', 'pessoaId' ]

const iTip = [{ model: mTip, require: true, attributes: aTip, as: 'Tip' }]

const iPes = [{ model: mPes, require: true, attributes: aUsu, as: 'End', include: iTip }]

const sTip = { raw: true, attributes: ['id', 'tipo'], order: [['id', 'asc']]}

const sUsu = { raw: true, attributes: aUsu, include: iTip, order: [[ 'id', 'asc' ]]}

const sPes = { raw: true, attributes: aPes, include: iPes, order: [[ 'id', 'asc' ]]}

const sPnt = { raw: true, attributes: aPnt, include: iPes, order: [[ 'id', 'asc' ]]}

var whr = ''
var dad = {}
var sql = {}

/**** Lista de Tipos ****/  

exports.listTip = (req, res) => {

  mTip.findAll(sTip).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Usuários ****/  

exports.listUsu = (req, res) => {

  mPes.findAll(sUsu).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

//**** GET - Lista Um ou Todos os Registros da Tabela ****//

exports.listPes = (req, res) => {

  mEnd.findAll(sPes).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

//**** GET - Lista Um ou Todos os Registros da Tabela ****//

exports.listPnt = (req, res) => {

    mPnt.findAll(sPnt).then(Ret => {
      res.send(Ret)
      console.table(Ret)
    })

}

/**** Inclui Novo Registro na Tabela ****/

exports.criaUsu = (req, res) => {

  //Cast JSON para Variaveis
  var {nome, codigo, tipoId} = req.body

  //Padroniza "tipoId"  
  tipoId = tipoId || 5 // 5 = Consumidor

  //Padroniza "codigo"
  codigo = codigo || "Não informado"

  //Cast Variáveis para JSON
  dad = {nome, codigo, tipoId}

  //Cria e Salva um Novo Registro na Tabela.
  mPes.create(dad).then(Ret => {

      mPes.findAll(sUsu).then(Ret => {
        res.send(Ret)
        console.table(Ret)
      })

    }).catch(error => {res.send(error)})

}

//**** Inclui Novo Registro na Tabela ****//

exports.criaPes = (req, res) => {

  //Cast JSON para Variaveis
  var {cep, numero, complemento, nome, codigo, tipoId, id} = req.body

  //Padroniza "tipoId"  
  tipoId = tipoId || 5 // 5 = Consumidor

  //Padroniza "codigo"
  codigo = codigo || "Não informado"

  //Cast Variáveis para JSON
  dad = {nome, codigo, tipoId}

  //Cria e Salva um Novo Registro na Tabela.
  mPes.create(dad).then(Ret => {

      //Sequencia da Pessoa
      var pessoaId = Ret.id

      //Padroniza "numero"
      numero = numero || "S/N"

      //Cast Variáveis para JSON
      dad = {cep, numero, complemento, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mEnd.create(dad).then(Ret => {

         mEnd.findAll(sPes).then(Ret => {
            res.send(Ret)
            console.table(Ret)
          })

        })

      })
  }

//**** Inclui Novo Registro na Tabela ****//

exports.criaPnt = (req, res) => {

  //Cast JSON para Variaveis
  var {situacao, qrcode, cep, numero, complemento, nome, codigo, tipoId, id} = req.body

  //Padroniza "tipoId"  
  tipoId = tipoId || 5 // 5 = Consumidor

  //Padroniza "codigo"
  codigo = codigo || "Não informado"

  //Cast Variáveis para JSON
  dad = {nome, codigo, tipoId}

  //Cria e Salva um Novo Registro na Tabela.
  mPes.create(dad).then(Ret => {

      //Sequencia da Pessoa
      var pessoaId = Ret.id

      //Padroniza "qrcode"
      qrcode = qrcode || "Falta Gerar o QRCode"

      //Padroniza "situacao"
      situacao = situacao || 0

      //Cast Variáveis para JSON
      dad = {situacao, qrcode, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mPnt.create(dad).then(Ret => {

        //Padroniza "cep"
        cep = cep || "00000000"

        //Padroniza "numero"
        numero = numero || "S/N"

        //Cast Variáveis para JSON
        dad = {cep, numero, complemento, pessoaId}

        //Cria e Salva um Novo Registro na Tabela.
        mEnd.create(dad).then(Ret => {

           mPnt.findAll(sPnt).then(Ret => {
              res.send(Ret)
              console.table(Ret)
            })

          })
        })


      })
  }

