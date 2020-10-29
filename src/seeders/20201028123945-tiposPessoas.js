'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tipos', [
      {tipo: 'Usuário'},
      {tipo: 'Fornecedor'},
      {tipo: 'Responsável'},
      {tipo: 'Certificador'},
      {tipo: 'Consumidor'},
      {tipo: 'Ponto Comercial'}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tipos', null, {})
  }
}
