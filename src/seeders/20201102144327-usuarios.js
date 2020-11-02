'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {pessoaId: 1, senha: '123456', situacao: 0},
      {pessoaId: 2, senha: '123456', situacao: 0},
      {pessoaId: 3, senha: '123456', situacao: 0},
      {pessoaId: 4, senha: '123456', situacao: 0},
      {pessoaId: 5, senha: '123456', situacao: 0},
      {pessoaId: 6, senha: '123456', situacao: 0}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {})
  }
}
