'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProdOrgs', [
    {
      origem: 'P',
      pessoaId: 2,
      produtoId: 1
     },
     {
      origem: 'P',
      pessoaId: 2,
      produtoId: 2
     },
     {
      origem: 'T',
      pessoaId: 6,
      produtoId: 1
     },
     {
      origem: 'T',
      pessoaId: 6,
      produtoId: 2
     },
     {
      origem: 'T',
      pessoaId: 6,
      produtoId: 3
     }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProdOrgs', null, {})
  }
}
