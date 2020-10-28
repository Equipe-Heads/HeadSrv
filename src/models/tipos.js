'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Tipos extends Model {}

  // Inicializa o "Model"
  Tipos.init(
    
    // Define os Atributos do "Model"
    {tipo: DataTypes.STRING},

    // Nome da tabela do "Model" 
    {sequelize, modelName: 'Tipos'}

  )

  // Retorna a Class "Model"
  return Tipos
}