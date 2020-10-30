'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PessoaFis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PessoaFis.init({
    pessoaId: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    orgao: DataTypes.STRING,
    expedicao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PessoaFis',
  });
  return PessoaFis;
};