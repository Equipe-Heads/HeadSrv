'use strict'

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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