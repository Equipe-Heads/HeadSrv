'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class ProdOrgs extends Model {

    static associate(models) {

      ProdOrgs.belongsTo(
        models.Produtos, 
        {
          foreignKey: 'produtoId', 
          as: 'Prd'
        }
      ),

      ProdOrgs.belongsTo(
        models.Pessoas, 
        {
          foreignKey: 'pessoaId',
          as: 'Pes'
        }
      ) 

    } // static associate(models)

  } // class ProdOrgs extends Model

  // Inicializa o "Model"
  ProdOrgs.init(
    //Atributtes
    {
      origem: DataTypes.STRING,
      pessoaId: DataTypes.INTEGER,
      produtoId: DataTypes.INTEGER
    }, 
    //Options
    {
      sequelize,
      modelName: 'ProdOrgs',
    }
  ) // ProdOrgs.init

  return ProdOrgs

} // module.exports = (sequelize, DataTypes)