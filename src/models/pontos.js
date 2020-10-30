'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

   // Cria um "Model"
  class Pontos extends Model {
    static associate(models) {
      Pontos.belongsTo(
        models.Pessoas, {
        foreignKey: 'pessoaId',
        as: 'Pes', 
        allowNull: true
      }),
      Pontos.belongsTo(
        models.Pessoas, {
        foreignKey: 'reponsavelId',
        as: 'Rsp', 
        allowNull: true
      })
    }
  }
 
  // Inicializa o "Model"
  Pontos.init(
    
    // Define os Atributos do "Model"
    {
      qrcode: DataTypes.STRING,
      situacao: DataTypes.INTEGER,
      reponsavelId: DataTypes.INTEGER,
      pessoaId: DataTypes.INTEGER
    },

    // Nome da Pontosela do "Model"
    {sequelize, modelName: 'Pontos'}

  )

  // Retorna a Class "Model"
  return Pontos

}
