'use strict'

// Usa o "sequelize"
const {Model, Sequelize} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Pagtos extends Model {
    static associate(models) {
     // Pagtos.belongsTo(
     //    models.Titulos, {
     //    foreignKey: 'tituloId',
     //    as: 'Pes', 
     //    allowNull: true
     //  })
    }
  }

  // Inicializa o "Model"
  Pagtos.init({
    tipo: {
      type: DataTypes.STRING,
      defaultValue: 'D'
    },
    pagto: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    pago: DataTypes.FLOAT,
    tituloId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pagtos',
  })
  return Pagtos
}