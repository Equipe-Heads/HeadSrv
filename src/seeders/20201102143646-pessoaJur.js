'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PessoaJurs', [
      {
        pessoaId: 6,
        cnpj: "12123123000100",
        inscEst: "123456789012",
        inscMun: "123456789012" 
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PessoaJurs', null, {})
  }
}
