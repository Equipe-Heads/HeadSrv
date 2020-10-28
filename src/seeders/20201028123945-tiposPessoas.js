'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Tipos', [
      {tipo: 'Usuário'},
      {tipo: 'Fornecedor'},
      {tipo: 'Ponto Comercia'},
      {tipo: 'Certificador'},
      {tipo: 'Consumidor'}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Tipos', null, {})
  }
}
