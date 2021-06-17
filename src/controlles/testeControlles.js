exports.pessoaDad = async (req, res) => {
  /**/
  const tab = require('../models').Pessoas
  /**/
  const cmp = [ 
    ['id', 'IdReg'],
    ['codigo', 'CodPessoa'],
    ['nome', 'NomPessoa'],
    ['tipoId','SeqTipo'] 
  ]
  /**/
  const ord = ['id', 'asc']
  /**/
  var sql = ""
  /**/
  if (req.params.id != null) 
  { sql = { raw: true, attributes: cmp, where: {id: req.params.id}} }
  else
  { sql = { raw: true, attributes: cmp, order: [ ord ]} }
  /**/
  tab.findAll(sql).then(Ret => {
    /*Resgata Dados do Tipo*
    tab = require('../models').Tipos
    cmp = ['tipo'] 
    sql = { raw: true, attributes: cmp, where: {id: Ret.IdReg}}
    tab.findAll(sql).then(dad)
    /*Atualiza Daos de Retorno*/
    dad = { IdReg, CodPessoa, NomPessoa} //, tipo}
    /*Retorna Dados*/
    res.send(dad)
    console.table(dad)
    /*Fim*/
  })
  /**/
}

exports.listTipos = async (req, res) => {
	/**/
  const tab = require('../models').Tipos
  /**/
  const cmp = ['id', 'tipo'] 
  /**/
  var sql = ""
  /**/
  const ord = ['id', 'asc']
  /**/
  if (req.params.id != null) 
  { sql = { raw: true, attributes: cmp, where: {id: req.params.id}}	}
  else
  { sql = { raw: true, attributes: cmp, order: [ ord ]} }
	/**/
  tab.findAll(sql).then(Ret => {		
		res.send(Ret)
		console.table(Ret)
  })
  /**/
}

exports.listPessoas = async (req, res) => {
	/**/
  const tab = require('../models').Pessoas
  /**/
  const cmp = [ 
  	['id', 'IdReg'],
  	['codigo', 'CodPessoa'],
  	['nome', 'NomPessoa'],
  	['tipoId','SeqTipo'] 
  ]
  /**/
  const ord = ['id', 'asc']
  /**/
  var sql = ""
  /**/
  if (req.params.id != null) 
  { sql = { raw: true, attributes: cmp, where: {id: req.params.id}} }
  else
  { sql = { raw: true, attributes: cmp, order: [ ord ]} }
	/**/
  tab.findAll(sql).then(Ret => {		
	  res.send(Ret)
	  console.table(Ret)
  })
  /**/
}

exports.pessoaFis = async (req, res) => {
	/**/
  const tab = require('../models').PessoaFis
  /**/
 	const Cmp = [ 'PessoaId',
  	['cpf', 'CpfPessoa'], 
  	['rg', 'NumRegistro'], 
  	['orgao', 'ExpRegistro'], 
  	['expedicao', 'DatRegistro'] 
  ]
  /**/
  var sql = { raw: true, attributes: Cmp, where: {PessoaId: req.params.id}}
  /**/
  tab.findAll(sql).then(Ret => {		
		res.send(Ret)
		console.table(Ret)
  })
  /**/
}

exports.pessoaJur = async (req, res) => {
	/**/
  const tab = require('../models').PessoaJurs
  /**/
 	const Cmp = [ 'PessoaId',
  	[ 'cnpj', 'CgcPessoa'],
  	[ 'inscEst', 'InsEstadual'],
  	[ 'inscMun', 'InsMunicipal']
  ]
  /**/
  var sql = { raw: true, attributes: Cmp, where: {PessoaId: req.params.id}}
  /**/
  tab.findAll(sql).then(Ret => {		
		res.send(Ret)
		console.table(Ret)
  })
  /**/
}

exports.pessoaEnd = async (req, res) => {
	/**/
  const tab = require('../models').Enderecos
  /**/
 	const Cmp = [ 'PessoaId',
  	[ 'logradoro', 'NomLogradoro'],
  	[ 'numero', 'NumEnder'],
  	[ 'bairro', 'BaiLogradoro'],
  	[ 'complemento', 'CmpEnder'],
  	[ 'cidade', 'CidLogradoro'],
  	[ 'uf', 'UnfLogradoro'],
  	[ 'cep', 'CepLogradoro']
  ]
  /**/
  var sql = { raw: true, attributes: Cmp, where: {PessoaId: req.params.id}}
  /**/
  tab.findAll(sql).then(Ret => {		
		res.send(Ret)
		console.table(Ret)
  })
  /**/
}

exports.pessoaFon = async (req, res) => {
	/**/
  const tab = require('../models').Telefones
  /**/
 	const Cmp = [ 'PessoaId',
  	[ 'NumFone', 'NumFone']
  ]
  /**/
  var sql = { raw: true, attributes: Cmp, where: {PessoaId: req.params.id}}
  /**/
  tab.findAll(sql).then(Ret => {		
		res.send(Ret)
		console.table(Ret)
  })
  /**/
}

exports.pessoaEma = async (req, res) => {
  /**/
  const tab = require('../models').Emails
  /**/
  const Cmp = [ 'PessoaId',
    [ 'EndEmail', 'EndEmail']
  ]
  /**/
  var sql = { raw: true, attributes: Cmp, where: {PessoaId: req.params.id}}
  /**/
  tab.findAll(sql).then(Ret => {    
    res.send(Ret)
    console.table(Ret)
  })
  /**/
}