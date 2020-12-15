'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produtos.hasMany(models.Produtos, {
        targetKey: 'ProdutosId',
        as: 'idProdutos'
      })  
    }
  };

  // Inicializa o "Model"
  Produtos.init({
    descricao: DataTypes.STRING,
    origem: {
      type: DataTypes.STRING,
      defaultValue: 'A'
    },
    beneficios: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produtos;
};