'use strict';
// Importa "Biblioteca de Criptografia"
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Criptografa a Senha
    const password = await bcrypt.hash('123', 10);
    //
    return queryInterface.bulkInsert('Usuarios', [
      {pessoaId: 1, senha: password, situacao: 0, nivel: 1},
      {pessoaId: 2, senha: password, situacao: 0, nivel: 2},
      {pessoaId: 3, senha: password, situacao: 0, nivel: 2},
      {pessoaId: 4, senha: password, situacao: 0},
      {pessoaId: 5, senha: password, situacao: 0, nivel: 2},
      {pessoaId: 6, senha: password, situacao: 0, nivel: 2}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {})
  }
}
