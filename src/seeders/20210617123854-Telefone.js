'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Telefones', [
      {
        pessoaId: 2,
        NumFone: '81995697602'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Telefones', null, {})
  }
}
