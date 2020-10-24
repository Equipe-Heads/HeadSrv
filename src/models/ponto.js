'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ponto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ponto.init({
    qrcode: DataTypes.STRING,
    situacao: DataTypes.INTEGER,
    pessoaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ponto',
  });
  return Ponto;
};