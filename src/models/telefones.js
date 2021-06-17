'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Telefones extends Model {
    static associate(models) {
      Telefones.belongsTo(
        models.Pessoas, {
        foreignKey: 'pessoaId',
        as: 'Pes', 
        allowNull: true
      })
    }
  }

  // Inicializa o "Model"
  Telefones.init({
    pessoaId: DataTypes.INTEGER,
    NumFone: DataTypes.STRING
  },

    // Nome da Enderecosela do "Model"
    { sequelize, modelName: 'Telefones' }

  )

  // Retorna a Class "Model"  
  return Telefones;

}