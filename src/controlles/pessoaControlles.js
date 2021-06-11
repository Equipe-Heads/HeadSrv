// Importa "Biblioteca de Criptografia"
const bcrypt = require('bcryptjs')

//Importa Objeto Toke do arquivo "chaveSecreta.js"
const { token } = require('../config/chaveSecreta')

//Importar uma Instância "Biblioteca que Gera Token"
const jwt = require('jsonwebtoken')

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
const aUsu = [ 'senha', ['situacao', 'SitUsuario'], 'nivel' ]
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

/**** Autenticação do Usuário ****/  

exports.autenticacao = async (req, res) => {

  //Cast JSON para Variaveis
  var {codigo, senha} = req.body

  //Padroniza "codigo"
  codigo = codigo || "Não informado"
  if (codigo == "Não informado") {
    return res.status(400).json({message:"O Código do Usuário DEVE ser Informado"}) 
  }    

  //Padroniza "senha"
  senha = senha || "Não informado"
  if (senha == "Não informado") {
    return res.status(400).json({message:"O Senha do Usuário DEVE ser Informada"}) 
  }    

  //Criptografa a Senha
  const password = await bcrypt.hash(senha, 10);

  //Comando Para Checar Código do Usuário
  sql = { raw: true, attributes: aPes, include: [ iTip, iUsu ], where: {codigo: codigo}}

  //Resgata Dados do Usuário
  const user = await mPes.findOne(sql)

  if (!user) {
    return res.status(400).json({message:"Código ou Senha Inválidos"})
    //return res.status(400).json({message:"Código Inválido"})
  }

  //Padroniza o Nível do Usuário
  var userNivel = 00;
  //Resgata Senha do Usuário
  const usu = await mUsu.findOne( {where: {pessoaId: user.idPessoa} } )

  //Resgata Senha no Banco de Dados
  if (usu) { 
    //Valida Senha
    const validaPassword = await bcrypt.compare(senha, usu.senha)
    //
    userNivel = usu.nivel;
    //Exibe Mensagem
    if(!validaPassword){
      return res.json({message:"Código ou Senha Inválidos"})
      //return res.json({message:"Senha Inválida"})
    }
  }

  //
  const { id } = user;
  const resultUser = {
    id: user.idPessoa,
    nome: user.nome,
    codigo: user.codigo,
    nivel: userNivel,
    //senhaBco: senhaBco,
    //senhaPsw: password,    
    //senhaInf: senha, 
    pessoa: user,
    //usuario: usu,
    Token: jwt.sign( { id },token.secret)
  };

  //
  let response = {
  }

  //
  if(userNivel==1){
    response.message = "Administrador Localizado";
    response.administrador = resultUser;
  }
  else
  if(userNivel==2){
    response.message = "Usuário Localizado";
    response.usuario = resultUser;
  }
  else
  {
    response.message = "Usuário Localizado (Nivel NÃO Definido)";
    response.usuario = resultUser;
  }
  
  //
  return res.send(response);
   
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

exports.criaUsu = async (req, res) => {

  //Cast JSON para Variaveis
  var {nome, codigo, tipoId, senha, sitUsuario} = req.body

  //Padroniza "codigo"
  codigo = codigo || "Não informado"
  if (codigo == "Não informado") {
    return res.status(400).json({message:"O Código do Usuário DEVE ser Informado"}) 
  }    

  //Comando Para Checar Código do Usuário
  sql = { raw: true, attributes: aPes, include: [ iTip, iUsu ], where: {codigo: codigo}}

  if (await mPes.findOne(sql)) {
    return res.status(400).json({message:"Código JÁ Cadastrado!!"}) 
  }

  //Criptografa a Senha
  const password = await bcrypt.hash(senha, 10);

  //Padroniza "tipoId"  
  tipoId = tipoId || 5 // 5 = Consumidor

  sql = { raw: true, attributes: aTip, where: {id: tipoId}}

  if (! await mTip.findOne(sql)) {
    return res.status(400).json({message:"tipoId NÃO Cadastrado!"}) 
  }

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
      dad = {senha: password, situacao, pessoaId}

      //Cria e Salva um Novo Registro na Tabela.
      mUsu.create(dad).then(Ret => {
        mPes.findOne(wUsu).then(Ret => {
          res.send(Ret)
          console.table(Ret)
        })
      }) // mUsu.create(dad).then

    } // // ifelse (senha == '')

  }) // mPes.create(dad).then


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
