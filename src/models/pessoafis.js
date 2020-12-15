'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
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

  // Inicializa o "Model"
  PessoaFis.init({
    pessoaId: DataTypes.INTEGER,
    cpf: { 
      type: DataTypes.STRING, 
      primaryKey: true 
    },
    rg: DataTypes.STRING,
    orgao: DataTypes.STRING,
    expedicao: DataTypes.DATE
    }, 
    {
      sequelize,
      modelName: 'PessoaFis',
    }
  );
  return PessoaFis;
};