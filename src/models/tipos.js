'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class tab extends Model {}

  // Inicializa o "Model"
  tab.init(
    
    // Define os Atributos do "Model"
    {tipo: DataTypes.STRING},

    // Nome da tabela do "Model" 
    {sequelize, modelName: 'Tipo'}

  )

  // Retorna a Class "Model"
  return tab
}