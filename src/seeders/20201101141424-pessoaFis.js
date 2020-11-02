'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PessoaFis', [
      {
        pessoaId: 1,
        cpf: '35481846420',
        rg: '2476185',
        orgao: 'SDS-PE',
        expedicao: '2019-12-20'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PessoaFis', null, {})
  }
}
