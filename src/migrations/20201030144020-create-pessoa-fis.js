'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PessoaFis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pessoaId: {
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING
      },
      rg: {
        type: Sequelize.STRING
      },
      orgao: {
        type: Sequelize.STRING
      },
      expedicao: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PessoaFis');
  }
};