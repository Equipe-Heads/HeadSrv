'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class tab extends Model {
    static associate(models) {
      tab.belongsTo(
        models.Tipo, 
        {
          foreignKey: 'tipoId', 
          as: 'Tip', 
          allowNull: false
        }
      )
    }
  }

  // Inicializa o "Model"
  tab.init(
    
    // Define os Atributos do "Model"
    {
      nome: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      tipoId: DataTypes.INTEGER
    },

    // Nome da tabela do "Model"
    {sequelize, modelName: 'Pessoas'}

  )

  // Retorna a Class "Model"
  return tab

}

