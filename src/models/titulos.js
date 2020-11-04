'use strict';

const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Titulos extends Model {

    static associate(models) {
     Titulos.belongsTo(
        models.Pessoas, {
        foreignKey: 'pessoaId',
        as: 'Pes', 
        allowNull: true
      }),
      Titulos.hasOne(
        models.Pagtos,
        {
          foreignKey: 'tituloId',
          as: 'Pag', 
          allowNull: false
        }
      )

    }

  }

  Titulos.init({
// Criar dois objetos com o mesmo valor gerará um erro. A propriedade única pode ser um
// booleano ou uma string. Se você fornecer a mesma string para várias colunas, elas formarão um
// chave única composta.
    numero: { 
      type: DataTypes.STRING,  
      unique: 'NumTipTituloIndex' 
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: "R",  
      unique: 'NumTipTituloIndex'
    },
    situacao: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    lancto: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    vencto: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    liquido: DataTypes.FLOAT,
    pessoaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Titulos',
  });
  return Titulos;
};