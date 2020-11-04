'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Titulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING,  
      unique: 'NumTipTituloIndex'
      },
      tipo: {
        type: Sequelize.STRING,  
      unique: 'NumTipTituloIndex'
      },
      situacao: {
        type: Sequelize.STRING
      },
      lancto: {
        type: Sequelize.DATE
      },
      vencto: {
        type: Sequelize.DATE
      },
      liquido: {
        type: Sequelize.FLOAT
      },
      pessoaId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Titulos');
  }
};