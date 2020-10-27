// Usa o "pessoaControlles.js"
const cnt = require('../controlles/pessoaControlles.js')

// Exporta o "Módulo"
module.exports = (app) => {

  //Define Routs
  const tip = app.route('/tip')
  const usu = app.route('/usu')
  const pes = app.route('/pes')
  const pnt = app.route('/pnt')

  // Exporta a route "tip"
  tip.get(cnt.listTip)
  usu.get(cnt.listUsu)
  pes.get(cnt.listPes)
  pnt.get(cnt.listPnt)
 
  // Exporta a route "usu"
  usu.post(cnt.criaUsu)
  pes.post(cnt.criaPes)
  pnt.post(cnt.criaPnt)

}