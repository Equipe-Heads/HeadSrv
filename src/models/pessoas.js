'use strict'

// Usa o "sequelize"
const {Model} = require('sequelize')

// Exporta o "Módulo"
module.exports = (sequelize, DataTypes) => {

  // Cria um "Model"
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.belongsTo(
        models.Tipos, 
        {
          foreignKey: 'tipoId', 
          as: 'Tip', 
          allowNull: false
        }
      ),
      Pessoas.hasOne(
        models.PessoaFis,
        {
          foreignKey: 'pessoaId',
          as: 'Fis', 
          allowNull: false
        }
      ),
      Pessoas.hasOne(
        models.PessoaJurs,
        {
          foreignKey: 'pessoaId',
          as: 'Jur', 
          allowNull: false
        }
      ),
      Pessoas.hasOne(
        models.Enderecos, 
        {
          foreignKey: 'pessoaId',
          as: 'End', 
          allowNull: true
        }
      ),
      Pessoas.hasOne(
        models.Usuarios, 
        {
          foreignKey: 'pessoaId',
          as: 'Usu', 
          allowNull: true
        }
      )
    }
  }

  // Inicializa o "Model"
  Pessoas.init(
    
    // Define os Atributos do "Model"
    {
      nome: DataTypes.STRING,
      teste: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
      tipoId: DataTypes.INTEGER
    },

    // Nome da Pessoasela do "Model"
    {sequelize, modelName: 'Pessoas'}

  )

  // Retorna a Class "Model"
  return Pessoas

}

