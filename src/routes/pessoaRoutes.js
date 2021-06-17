// Usa o "(...)Controlles.js"
const cPrd = require('../controlles/produtoControlles.js')
const cPes = require('../controlles/pessoaControlles.js')
const cTit = require('../controlles/tituloControlles.js')
const cTst = require('../controlles/testeControlles.js')

// Exporta o "Módulo"
module.exports = (app) => {

  const { authenticate } = require('../middleware/autoToken.js');

  //Define Routs
  const rOrg = app.route('/org')
  const rPrd = app.route('/prd')
  const rTit = app.route('/tit')
  const rPag = app.route('/pag')
  const rTip = app.route('/tip')
  const rUsu = app.route('/usu')
  const rPes = app.route('/pes')
  const rPnt = app.route('/pnt')
  const rLog = app.route('/log')
  
  app.route('/pessoas').get(cTst.listPessoas)
  app.route('/pessoas/:id').get(cTst.listPessoas)
 
  app.route('/pessoaDad').get(cTst.pessoaDad)
  app.route('/pessoaDad/:id').get(cTst.pessoaDad)
 
  app.route('/listTipos').get(cTst.listTipos)
  app.route('/listTipos/:id').get(cTst.listTipos)

  app.route('/pessoaFis/:id').get(cTst.pessoaFis)
  app.route('/pessoaJur/:id').get(cTst.pessoaJur)
  app.route('/pessoaEnd/:id').get(cTst.pessoaEnd)
  app.route('/pessoaFon/:id').get(cTst.pessoaFon)
  app.route('/pessoaEma/:id').get(cTst.pessoaEma)
  
  // Exporta "GETs"
  rOrg.get(cPrd.listOrg)
  rPrd.get(cPrd.listPrd)
  rTit.get(cTit.listTit)
  rTip.get(cPes.listTip)
  rUsu.get(cPes.listUsu)
  rPes.get(cPes.listPes)
  rPnt.get(cPes.listPnt)
 
  // Exporta "POSTs"
  rLog.post(cPes.autenticacao)
  rOrg.post(cPrd.criaOrg)
  rPrd.post(cPrd.criaPrd)
  rTit.post(cTit.criaTit)
  rPag.post(cTit.criaPag)
  rUsu.post(authenticate,cPes.criaUsu)// Rota Protegida
  rPes.post(cPes.criaPes)
  rPnt.post(cPes.criaPnt)

}