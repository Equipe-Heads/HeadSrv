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

// Comando Queries
const sTip = { raw: true, attributes: ['id', 'tipo'], order: [ ordId ]}
const sUsu = { raw: true, attributes: aPes, include: [ iTip, iUsu ], order: [ ordId ]}
const sPnt = { raw: true, attributes: aPnt, include: [ iPes, iRsp ], order: [ ordId ]}
const sPes = { raw: true, attributes: aPes, include: [ iTip, iFis, iJur, iEnd, iUsu ], order: [ ordId ]}


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

/**** Lista de Pessoas ****/  

exports.listPes = (req, res) => {

  mPes.findAll(sPes).then(Ret => {
    res.send(Ret)
    console.table(Ret)
  })

}

/**** Lista de Pontos Comerciais ****/  

exports.listPnt = (req, res) => {

 mPnt.findAll(sPnt).then(Ret => {
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

  //Padroniza "codigo"
  codigo = codigo || "Não informado"

  //Cast Variáveis para JSON
  dad = {nome, codigo, tipoId}

  //Cria e Salva um Novo Registro na Tabela.
  mPes.create(dad).then(Ret => {

    //Sequencia da Pessoa
    var pessoaId = Ret.id

    whr = {id: Ret.id}
      
    wUsu = { raw: true, attributes: aPes, include: [ iTip, iUsu ], where: whr, order: [ ordId ]}

    //Checa e Grava Usuário
    if (senha == '') {
      mPes.findOne(wUsu).then(Ret => {
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
        mPes.findOne(wUsu).then(Ret => {
          res.send(Ret)
          console.table(Ret)
        })
      })
    }

  })

}

//**** Inclui Novo Registro na Tabela ****//

exports.criaPes = (req, res) => {

  //Cast JSON para Variaveis
  var {
    cep, numero, complemento, logradoro, bairro, cidade, uf,
    sitUsuario, nome, codigo, tipo, tipoId, 
    senha, cpf, rg, orgao, expedicao, cnpj, inscEst, inscMun, id} = req.body  

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

      wPes = { raw: true, attributes: aPes, include: [ iTip, iFis, iJur, iEnd, iUsu ], where: whr, order: [ ordId ]}

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

    wPnt = { raw: true, attributes: aPnt, include: [ iPes, iRsp ], where: whr, order: [ ordId ]}

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
