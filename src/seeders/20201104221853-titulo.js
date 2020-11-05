'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Titulos', [
      {
        numero: '000001', 
        vencto: '2020-11-04', 
        liquido: 100, 
        tipo: 'R', 
        pessoaId: 6,
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Titulos', null, {})
  }
}
