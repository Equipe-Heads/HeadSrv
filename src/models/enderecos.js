'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Enderecos extends Model {
    static associate(models) {
      Enderecos.belongsTo(
        models.Pessoas, {
        foreignKey: 'pessoaId',
        as: 'Pes', 
        allowNull: true
      })
    }
  }

  // Inicializa o "Model"
  Enderecos.init(
    
    // Define os Atributos do "Model"
    {
      logradoro: DataTypes.STRING,
      numero: DataTypes.STRING,
      bairro: DataTypes.STRING,
      complemento: DataTypes.STRING,
      cidade: DataTypes.STRING,
      uf: DataTypes.STRING,
      cep: DataTypes.STRING,
      pessoaId: DataTypes.INTEGER
    },

    // Nome da Enderecosela do "Model"
    {sequelize, modelName: 'Enderecos'}

  )

  // Retorna a Class "Model"
  return Enderecos

}
