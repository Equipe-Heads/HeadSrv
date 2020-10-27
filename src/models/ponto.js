'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

   // Cria um "Model"
  class tab extends Model {
    static associate(models) {
      tab.belongsTo(
        models.Pessoas, {
        foreignKey: 'pessoaId',
        as: 'Pnt', 
        allowNull: true
      })
    }
  }
 
  // Inicializa o "Model"
  tab.init(
    
    // Define os Atributos do "Model"
    {
      qrcode: DataTypes.STRING,
      situacao: DataTypes.INTEGER,
      pessoaId: DataTypes.INTEGER
    },

    // Nome da tabela do "Model"
    {sequelize, modelName: 'Ponto'}

  )

  // Retorna a Class "Model"
  return tab

}
