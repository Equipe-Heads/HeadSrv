'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Usuarios extends Model {
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
  Usuarios.init({
    pessoaId: DataTypes.INTEGER,
    senha: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    situacao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};