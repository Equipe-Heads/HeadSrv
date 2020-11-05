'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Produtos', [
    {
      descricao: 'Banana',
      origem: 'V',
      beneficios: 'Serve para engordar macaco'
    },
    {
      descricao: 'Leite em Pó',
      origem: 'I',
      beneficios: 'Fabricado diretamente do leite provenientes de fazendas orgânicas'
    },
    {
      descricao: 'Ovos',
      origem: 'A',
      beneficios: 'Diretos do Granjeiro. Compre para econimizar, compre economizando'
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Produtos', null, {})
  }
}
