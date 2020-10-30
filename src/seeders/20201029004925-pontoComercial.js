'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pontos', [
      {
        qrcode: 'Não Gerado',
        situacao: 0,
        reponsavelId: 2,
        pessoaId: 2
      },
      {
        qrcode: 'Não Gerado',
        situacao: 0,
        reponsavelId: 3,
        pessoaId: 6
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pontos', null, {})
  }
}
