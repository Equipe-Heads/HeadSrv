'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PessoaJurs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PessoaJurs.init({
    pessoaId: DataTypes.INTEGER,
    cnpj: DataTypes.STRING,
    inscEst: DataTypes.STRING,
    inscMun: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PessoaJurs',
  });
  return PessoaJurs;
};