'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.belongsTo(
        models.Tipos, 
        {
          foreignKey: 'tipoId', 
          as: 'Tip', 
          allowNull: false
        }
      )
    }
  }

  // Inicializa o "Model"
  Pessoas.init(
    
    // Define os Atributos do "Model"
    {
      nome: DataTypes.STRING,
      teste: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      tipoId: DataTypes.INTEGER
    },

    // Nome da Pessoasela do "Model"
    {sequelize, modelName: 'Pessoas'}

  )

  // Retorna a Class "Model"
  return Pessoas

}

