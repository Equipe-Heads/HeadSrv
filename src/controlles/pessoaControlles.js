// Models
const mTip = require('../models').Tipos
const mPnt = require('../models').Pontos
const mPes = require('../models').Pessoas
const mUsu = require('../models').Usuarios
const mEnd = require('../models').Enderecos
const mFis = require('../models').PessoaFis
const mJur = require('../models').PessoaJurs

// Attributes
const aTip = [ 'tipo' ]
const aRsp = [ ['nome', 'Responsável'] ]
const aJur = [ 'cnpj', 'inscEst', 'inscMun' ]
const aFis = [ 'cpf', 'rg', 'orgao', 'expedicao' ]
const aPnt = [ 'qrcode', ['situacao', 'SitPonto'] ]
const aUsu = [ 'senha', ['situacao', 'SitUsuario'] ]
const aPes = [ ['id', 'idPessoa'], 'codigo', ['nome', 'nome_razaoSocial'] ]
const aEnd = [ 'logradoro', 'numero', 'bairro', 'complemento', 'cidade', 'uf', 'cep' ]

// Include
const iTip = { model: mTip, attributes: aTip, as: 'Tip' }
const iFis = { model: mFis, attributes: aFis, as: 'Fis' }
const iJur = { model: mJur, attributes: aJur, as: 'Jur' }
const iEnd = { model: mEnd, attributes: aEnd, as: 'End' }
const iUsu = { model: mUsu, attributes: aUsu, as: 'Usu' }
const iRsp = { model: mPes, attributes: aRsp, as: 'Rsp' }
const iPes = { model: mPes, attributes: aPes, as: 'Pes', include: [ iTip, iFis, iJur, iEnd, iUsu ] }

// Ordenação
const ordId = ['id', 'asc']

/**** Lista de Tipos ****/ 

exports.listTip = (req, res) => {

  const sql = { raw: true, attributes: ['id', 'tipo'], order: [ ordId ]}

  mTip.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Usuários ****/  

exports.listUsu = (req, res) => {

  const sql = { raw: true, attributes: aPes, include: [ iTip, iUsu ], order: [ ordId ]}

  mPes.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Pessoas ****/  

exports.listPes = (req, res) => {
  const sql = { raw: true, attributes: aPes, include: [ iTip, iFis, iJur, iEnd, iUsu ], order: [ ordId ]}
  mPes.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Pontos Comerciais ****/  

exports.listPnt = (req, res) => {
  const sql = { raw: true, attributes: aPnt, include: [ iPes, iRsp ], order: [ ordId ]}
  mPnt.findAll(sql).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Inclui Novo Registro na Tabela ****/

exports.criaUsu = (req, res) => {

  //Cast JSON para Variaveis
  var {nome, codigo, tipoId, senha, sitUsuario} = req.body

  //Padroniza "tipoId"  
  tipoId = tipoId || 5 // 5 = Consumidor

  sql = { raw: true, attributes: aTip, where: {id: tipoId}}

  mTip.findOne(sql).then(Ret => {

    if (Ret == null) {
      msg = {
        "Mensagem": 'O "tipoId" NÃO Cadastrado',
        "Dados": req.body
      }
      res.send(msg)
      console.table(msg)
    } else
    {

      //Padroniza "codigo"
      codigo = codigo || "Não informado"

      if (codigo == "Não informado") {
        msg = {
          "Mensagem": 'O "Código do Usuário" DEVE ser Informado',
          "Dados": req.body
        }
        res.send(msg)
        console.table(msg)
      } else 
      {

        sql = { raw: true, attributes: aPes, include: [ iTip, iUsu ], where: {codigo: codigo}}

        mPes.findOne(sql).then(Ret => {

          if (Ret != null) {
            msg = {
              "Mensagem": '"Código do Usuário" JÁ Cadastrado',
              "Dados": Ret
            }
            res.send(msg)
            console.table(msg)
          } else 
          { 

            //Cast Variáveis para JSON
            dad = {nome, codigo, tipoId}

            //Cria e Salva um Novo Registro na Tabela.
            mPes.create(dad).then(Ret => {

              //Sequencia da Pessoa
              var pessoaId = Ret.id

              whr = {id: Ret.id}
                
              wUsu = { raw: true, attributes: aPes, include: [ iTip, iUsu ], where: whr}

              //Checa e Grava Usuário
              if (senha == '') {
                mPes.findOne(wUsu).then(Ret => {
                  res.send(Ret)
                  console.table(Ret)
                })
              } else { 

                //Padroniza "situacao"
                situacao = sitUsuario || 0

                //Cast Variáveis para JSON
                dad = {senha, situacao, pessoaId}

                //Cria e Salva um Novo Registro na Tabela.
                mUsu.create(dad).then(Ret => {
                  mPes.findOne(wUsu).then(Ret => {
                    res.send(Ret)
                    console.table(Ret)
                  })
                }) // mUsu.create(dad).then

              } // // ifelse (senha == '')

            }) // mPes.create(dad).then

          } //ifelse (Ret != null)

        }) // mPes.findOne(sql).then

      } // ifelse (codigo == "Não informado")

    } // if (Ret != null) - "tipoId"

  }) // mTip.findOne(sql).then

} // exports.criaUsu = (req, res)

//**** Inclui Novo Registro na Tabela ****//

exports.criaPes = (req, res) => {

  //Cast JSON para Variaveis
  var {
    cep, numero, complemento, logradoro, bairro, cidade, uf,
    sitUsuario, nome, codigo, tipo, tipoId, 
    senha, cpf, rg, orgao, expedicao, cnpj, inscEst, inscMun,
    responsavel, id} = req.body  

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

      whr = {id: Ret.id}

      wPes = { raw: true, attributes: aPes, include: [ iTip, iFis, iJur, iEnd, iUsu ], where: whr}

      if (cpf != '') {

        //Cast Variáveis para JSON
        dad = {cpf, rg, orgao, expedicao, pessoaId}

        //Cria e Salva um Novo Registro na Tabela.
        mFis.create(dad)

      } else if (cnpj != '') {

        //Cast Variáveis para JSON
        dad = {cnpj, inscEst, inscMun, pessoaId}

        //Cria e Salva um Novo Registro na Tabela.
        mJur.create(dad)

      }

      //Padroniza "numero"
      numero = numero || "S/N"

      //Cast Variáveis para JSON
      dad = {cep, numero, complemento, logradoro, bairro, cidade, uf, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mEnd.create(dad).then(Ret => {

        //Checa e Grava Usuário
        if (senha == '') {
          mPes.findOne(wPes).then(Ret => {
            res.send(Ret)
            console.table(Ret)
          })
        }
        else
        {
          //Padroniza "situacao"
          situacao = sitUsuario || 0

          //Cast Variáveis para JSON
          dad = {senha, situacao, pessoaId}

          //Cria e Salva um Novo Registro na Tabela.
          mUsu.create(dad).then(Ret => {
            mPes.findOne(wPes).then(Ret => {
              res.send(Ret)
              console.table(Ret)
            })
          })
        }

      })
  })

}

//**** Inclui Novo Registro na Tabela ****//

exports.criaPnt = (req, res) => {

  //Cast JSON para Variaveis
  var {
    cep, numero, complemento, logradoro, bairro, cidade, uf,
    sitPonto, sitUsuario, qrcode, nome, codigo, tipoId, senha,
    SitUsuario, cpf, rg, orgao, expedicao, cnpj, inscEst, inscMun, id} = req.body

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

    whr = {pessoaId: Ret.id}

    wPnt = { raw: true, attributes: aPnt, include: [ iPes, iRsp ], where: whr}

    if (cpf != null) {

      //Cast Variáveis para JSON
      dad = {cpf, rg, orgao, expedicao, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mFis.create(dad)

    } else if (cnpj != null) {

      //Cast Variáveis para JSON
      dad = {cnpj, inscEst, inscMun, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mJur.create(dad)

    }

    //Padroniza "qrcode"
    qrcode = qrcode || "Falta Gerar o QRCode"

    //Padroniza "situacao"
    situacao = sitPonto || 0

    //Cast Variáveis para JSON
    dad = {situacao, qrcode, pessoaId}

    //Cria e Salva um Novo Registro na Tabela.
    mPnt.create(dad).then(Ret => {

      //Padroniza "cep"
      cep = cep || "00000000"

      //Padroniza "numero"
      numero = numero || "S/N"

      //Cast Variáveis para JSON
      dad = {cep, numero, complemento, logradoro, bairro, cidade, uf, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mEnd.create(dad).then(Ret => {
        
        //Checa e Grava Usuário
        if (senha == '') {
          mPnt.findOne(wPnt).then(Ret => {
            res.send(Ret)
            console.table(Ret)
          })
        }
        else
        {
    
          //Padroniza "situacao"
          situacao = sitUsuario || 0
    
          //Cast Variáveis para JSON
          dad = {senha, situacao, pessoaId}

          //Cria e Salva um Novo Registro na Tabela.
          mUsu.create(dad).then(Ret => {
            mPnt.findOne(wPnt).then(Ret => {
              res.send(Ret)
              console.table(Ret)
            })
          })
        }

      
      })
    
    })
  
  })

}
