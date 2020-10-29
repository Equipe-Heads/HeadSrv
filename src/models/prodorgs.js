'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdOrgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProdOrgs.belongsTo(models.Pessoas, {
        targetKey: 'id',
        as: 'idPessoa'
      }),  
      ProdOrgs.belongsTo(models.Produtos, {
        targetKey: 'id',
        as: 'idProduto'
      })  
    }
  };
  ProdOrgs.init({
    origem: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProdOrgs',
  });
  return ProdOrgs;
};