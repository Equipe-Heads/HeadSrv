'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Emails', [
      {
        pessoaId: 2,
        EndEmail: 'edbasi@hotmail.com'
      }
    ], {})
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Emails', null, {})
  }
};
