// Usa o "(...)Controlles.js"
const cPes = require('../controlles/pessoaControlles.js')
const cTit = require('../controlles/tituloControlles.js')

// Exporta o "Módulo"
module.exports = (app) => {

  //Define Routs
  const rTit = app.route('/tit')
  const rPag = app.route('/pag')
  const rTip = app.route('/tip')
  const rUsu = app.route('/usu')
  const rPes = app.route('/pes')
  const rPnt = app.route('/pnt')

  // Exporta "GETs"
  rTit.get(cTit.listTit)
  rTip.get(cPes.listTip)
  rUsu.get(cPes.listUsu)
  rPes.get(cPes.listPes)
  rPnt.get(cPes.listPnt)
 
  // Exporta "POSTs"
  rTit.post(cTit.criaTit)
  rPag.post(cTit.criaPag)
  rUsu.post(cPes.criaUsu)
  rPes.post(cPes.criaPes)
  rPnt.post(cPes.criaPnt)

}