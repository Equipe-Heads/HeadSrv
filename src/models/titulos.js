'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Titulos extends Model {
    static associate(models) {
      Titulos.belongsTo(models.Pessoas, {
        targetKey: 'id',
        as: 'idPessoa'
      })  
    }
  };
  Titulos.init({
    numero: DataTypes.STRING,
    situacao: DataTypes.STRING,
    lancto: DataTypes.DATE,
    vencto: DataTypes.DATE,
    liquido: DataTypes.FLOAT,
    pessoaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Titulos',
  });
  return Titulos;
};