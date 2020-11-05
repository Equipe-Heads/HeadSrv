// Models
const mTip = require('../models').Tipos
const mPrd = require('../models').Produtos
const mOrg = require('../models').ProdOrgs
const mPes = require('../models').Pessoas

// Attributes
const aTip = [ 'tipo' ]
const aPes = [ 'nome' ]
const aPrd = [ 'id', 'descricao', ['origem', 'orgProduto'], 'beneficios' ]
const aOrg = [ 'produtoId', 'pessoaId', ['origem', 'orgOrganico'] ]

// Include
const iTip = { model: mTip, attributes: aTip, as: 'Tip' }
const iPrd = { model: mPrd, attributes: aPrd, as: 'Prd' }
const iPes = { model: mPes, attributes: aPes, as: 'Pes' }

// Ordenação
const ordId = ['id', 'asc']

// Comando Queries
const sPrd = { raw: true, attributes: aPrd, order: [ ordId ]}

/**** Lista de Produtos ****/ 

exports.listPrd = (req, res) => {

  const sql = { raw: true, attributes: aPrd, order: [ ordId ]}

  mPrd.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Produtos Orgânico ****/ 

exports.listOrg = (req, res) => {

  const sql = { raw: true, attributes: aOrg, include: [ iPrd, iPes ], order: [ ordId ]}

  mOrg.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Grava de Produtos ****/ 

exports.criaPrd = (req, res) => {

  //Atualiza Variáveis
  var { descricao, orgProduto, beneficios } = req.body

  //Monta Comando SQL - where: {descricao: descricao}
  const sql = { raw: true, attributes: aPrd, where: {descricao: descricao}}

  //Resgata Dados da Tabela Produto
  mPrd.findOne(sql).then(Ret => {

    //Se Produto JÁ Cadastrado...
    if (Ret != null) {
      //...Exibe Dados
      res.send(Ret)
      console.table(Ret)
    } else {//if (Ret == null) {

      //Atualiza Campo "Origem do Produto"
      origem = orgProduto

      //Cast Variáveis para JSON
      dad = {descricao, origem, beneficios}

      //Cria e Salva um Novo Registro na Tabela.
      mPrd.create(dad).then(Ret => {

        //Monta Comando SQL - where: {id: Ret.id}
        const sql = { raw: true, attributes: aPrd, where: {id: Ret.id}}

        //Resgata Dados do Novo Produto
        mPrd.findOne(sql).then(Ret => {
          res.send(Ret)
          console.table(Ret)
        })
        
      }) // mPrd.create(dad)
    } // if (Ret == null)
  }) // mPrd.findOne(sql)
} // exports.criaPrd

/**** Grava de Produtos Orgânico ****/ 

exports.criaOrg = (req, res) => {

  //Atualiza Variáveis
  var { origem, pessoaId, produtoId } = req.body

  var whr =
    {
      pessoaId: pessoaId, 
      produtoId: produtoId
    }

  //Monta Comando SQL - where: {pessoaId, produtoId}
  const sql = { raw: true, attributes: aOrg, include: [ iPrd, iPes ], where: whr}

  //Resgata Dados da Tabela Produto
  mOrg.findOne(sql).then(Ret => {

    //Se Produto x Fornecedore JÁ Cadastrado...
    if (Ret != null) {
      //...Exibe Dados
      msg = {
        "Mensagem": "Produto x Fornecedore JÁ Cadastrado",
        "Dados": Ret
      }
      res.send(msg)
      console.table(Ret)
    } else { //if (Ret == null) {

      //Cast Variáveis para JSON
      dad = { origem, pessoaId, produtoId }

      //Cria e Salva um Novo Registro na Tabela.
      mOrg.create(dad).then(Ret => {

        var whr =
            {
              pessoaId: pessoaId, 
              produtoId: produtoId
            }

        // Monta Comando SQL - where: {id: Ret.id}
        const sql = { raw: true, attributes: aOrg, include: [ iPrd, iPes ], where: whr}

        // Resgata Dados do Novo Produto
        mOrg.findOne(sql).then(Ret => {
          res.send(Ret)
          console.table(Ret)
        })
        
      }) // mPrd.create(dad)
    } // if (Ret == null)
  }) // mPrd.findOne(sql)
} // exports.criaPrd
