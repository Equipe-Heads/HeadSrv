'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pessoas', [
      {nome: 'Edgar Batista da Silva Filho', codigo: 'Edgar', tipoId: 1},
      {nome: 'Romulo Filho', codigo: 'cccccc', tipoId: 2},
      {nome: 'Ivirto Ferrari', codigo: 'Ivirto', tipoId: 3},
      {nome: 'Erica Farias', codigo: 'Erica', tipoId: 4},
      {nome: 'Renata Casanova', codigo: 'Renata', tipoId: 5},
      {nome: 'Emporio Ceasinha', codigo: 'Ceasinha', tipoId: 6}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pessoas', null, {})
  }
}
