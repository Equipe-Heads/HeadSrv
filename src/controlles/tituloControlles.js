const { Sequelize } = require('sequelize');

// Models
const mTip = require('../models').Tipos
const mPes = require('../models').Pessoas
const mEnd = require('../models').Enderecos
const mFis = require('../models').PessoaFis
const mJur = require('../models').PessoaJurs
const mTit = require('../models').Titulos
const mPag = require('../models').Pagtos

// // Attributes
const aTip = [ 'tipo' ]
const aJur = [ 'cnpj', 'inscEst', 'inscMun' ]
const aFis = [ 'cpf', 'rg', 'orgao', 'expedicao' ]
const aPes = [ ['id', 'idPessoa'], 'codigo', ['nome', 'nome_razaoSocial'] ]
const aPag = [  ['tipo', 'tipPagto'], ['pagto', 'datPagto'], ['pago', 'valPago'] ]
const aEnd = [ 'logradoro', 'numero', 'bairro', 'complemento', 'cidade', 'uf', 'cep' ]
const aTit = [ ['id', 'idTitulo'], ['numero', 'numTitulo'], ['situacao', 'sitTitulo'], 
               ['tipo', 'tipTitulo'], 'lancto', 'vencto', 'liquido', 'pessoaId' ]

// Include
const iTip = { model: mTip, attributes: aTip, as: 'Tip' }
const iFis = { model: mFis, attributes: aFis, as: 'Fis' }
const iJur = { model: mJur, attributes: aJur, as: 'Jur' }
const iEnd = { model: mEnd, attributes: aEnd, as: 'End' }
const iPag = { model: mPag, attributes: aPag, as: 'Pag' }
const iUsu = { model: mPes, attributes: aPes, as: 'Pes' }
const iPes = { model: mPes, attributes: aPes, as: 'Pes', 
  include: [ iTip, iFis, iJur, iEnd ] }

// Ordenação
const ordId = ['id', 'asc']

/**** Lista de Registros ****/ 

exports.listTit = (req, res) => {

  // Comando Queries
  const sTit = { raw: true, attributes: aTit, include: [ iPag, iPes ], order: [ ordId ]}

  mTit.findAll(sTit).then(Ret => {
    res.send(Ret)
    console.log(Ret)
  })

}

//**** Inclui Novo Registro na Tabela ****//

exports.criaTit = (req, res) => {

  //Cast JSON para Variaveis
  var { numTitulo, sitTitulo, lancto, vencto, liquido, tipTitulo, 
     pessoaId, tituloId} = req.body


  numero = numTitulo
  situacao = sitTitulo
  tipo = tipTitulo

  //Cast Variáveis para JSON 
  dad = { numero, liquido, pessoaId, tipo} // , situacao, lancto, vencto

  //Cria e Salva um Novo Registro na Tabela.
  mTit.create(dad).then(Ret => {
    //
    const wTit = { raw: true, attributes: aTit, include: [ iUsu ], 
      where: {id: Ret.id}, order: [ ordId ]}
    //
    mTit.findOne(wTit).then(Ret => {
      res.send(Ret)
      console.table(Ret)
    })
  })
}

//**** Inclui Novo Registro na Tabela ****//

exports.criaPag = (req, res) => {

  //Cast JSON para Variaveis
  var { tipPagto, datPagto, valPago, tituloId, pagDesconto } = req.body

  //
  valLiquido = 0
  testeVal = valPago
  sitTitulo = 'X'

  //Monta Comando SELECT
  const wTit = { raw: true, attributes: aTit, 
    where: {id: tituloId}, include: [ iPag ], order: [ ordId ]}

  //Resgata Valor Liquido do Titulo
  mTit.findOne(wTit).then(Ret => {

    if (Ret == null) {

      msg = {
        "Mensagem": "Título Não Encontrado",
        "where": {tituloId: tituloId}
      }
      console.log(msg)
      res.send(msg)
      
    } else 
    if (Ret.sitTitulo != 'A') {
      msg = {
        "Mensagem": "Título Já Pago",
        "where": {tituloId: tituloId},
        "Dados": Ret
      }
      console.log(msg)
      res.send(msg)
    } else // if (Ret == null) 
    {

      //Resgata Dados do Titulo a Ser Pago
      var { numTitulo, sitTitulo, tipTitulo, liquido, vencto, pessoaId } = Ret

      //
      valLiquido = liquido
      datvencto = vencto

      //Define Nova Situação do Titulo
      if (valLiquido == valPago) {
        sitTitulo = 'L' // Liquidado   
      }
      else 
      if (valLiquido <= valPago) {
        sitTitulo = 'J' // Pago com Juros   
      }
      else 
      if (pagDesconto) {
        sitTitulo = 'D' // Pago com Desconto   
      }
      else {
        sitTitulo = 'P' //Pago Parcialmente
      }

      tipo = tipPagto
      pagto = datPagto
      pago = valPago

      //Cast Variáveis para JSON 
      dad = { tipo, pagto,  pago, tituloId }

      //Cria e Salva um Novo Registro na Tabela.
      mPag.create(dad).then(Ret => {

        //Atualiza Situação do Título
        mTit.update({ situacao: sitTitulo }, { where: { id: tituloId } } ).then(Ret => {
          //Monta Comando SELECT
          const wTit = { raw: true, attributes: aTit, include: [ iPag, iUsu ], 
            where: {id: tituloId}, order: [ ordId ]}

          //Dados do Titulo Pago
          mTit.findOne(wTit).then(Ret => {
            res.send(Ret)
            console.table(Ret)

            //Novo Titulo
            if (sitTitulo == 'P') {

              numero = numTitulo
              situacao = 'A'
              tipo = tipTitulo
              liquido = valLiquido - valPago
              vencto = datvencto
              lancto = Sequelize.NOW

              //Cast Variáveis para Novo Titulo 
              dad = { numero, liquido, pessoaId, situacao, lancto, vencto, tipo} // 

              //Cria e Salva um Novo Registro na Tabela.
              mTit.create(dad).then(Ret => {
                //
                const wTit = { raw: true, attributes: aTit, include: [ iPag ], 
                  where: {numero: Ret.numero}, order: [ ordId ]}
                //
                mTit.findAll(wTit).then(Ret => {
                  console.table(Ret)
                })
                
              })

            } //if (sitTitulo == 'P') //Novo Titulo

          }) // mTit.findOne //Dados do Titulo Pago


        }) // mTit.update

      }) // mPag.create

    } // else // if (Ret == null)

  }) // mTit.findOne //Resgata Valor Liquido do Titulo

} // exports.criaPag
