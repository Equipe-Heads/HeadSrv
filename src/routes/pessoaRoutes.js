// Usa o "(...)Controlles.js"
const cPrd = require('../controlles/produtoControlles.js')
const cPes = require('../controlles/pessoaControlles.js')
const cTit = require('../controlles/tituloControlles.js')

// Exporta o "Módulo"
module.exports = (app) => {

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

  // Exporta "GETs"
  rOrg.get(cPrd.listOrg)
  rPrd.get(cPrd.listPrd)
  rTit.get(cTit.listTit)
  rTip.get(cPes.listTip)
  rUsu.get(cPes.listUsu)
  rPes.get( (req, res, next) => { next() }, cPes.listPes)// Rota Protegida
  rPnt.get(cPes.listPnt)
 
  // Exporta "POSTs"
  rLog.post(cPes.autenticacao)
  rOrg.post(cPrd.criaOrg)
  rPrd.post(cPrd.criaPrd)
  rTit.post(cTit.criaTit)
  rPag.post(cTit.criaPag)
  rUsu.post(cPes.criaUsu)
  rPes.post(cPes.criaPes)
  rPnt.post(cPes.criaPnt)

}