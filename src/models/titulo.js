'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Titulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Titulo.init({
    numero: DataTypes.STRING,
    situacao: DataTypes.STRING,
    lancto: DataTypes.DATE,
    vencto: DataTypes.DATE,
    liquido: DataTypes.FLOAT,
    pessoaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Titulo',
  });
  return Titulo;
};