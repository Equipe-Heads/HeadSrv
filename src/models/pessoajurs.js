'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
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

  // Inicializa o "Model"
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