'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('PessoaFis', [
      {
        pessoaId: 2,
        cpf: '12345678900',
        rg: '1234567',
        orgao: 'SDS-PE',
        expedicao: null
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PessoaFis', null, {})
  }
}
