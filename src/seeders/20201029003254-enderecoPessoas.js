'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enderecos', [
      {
        logradoro: 'Rua Santa Lúcia',
        numero: '340',
        bairro: 'Iputinga',
        complemento: '1° Andar',
        cidade: 'Recife',
        uf: 'PE',
        cep: '50731340',
        pessoaId: 6
      },
      {
        logradoro: 'Rua do Sobe e Desce',
        numero: 'Desaparece',
        bairro: 'Onde Não mora Ninguém',
        complemento: '2° Andar o 1° Caiu',
        cidade: 'Recife',
        uf: 'PE',
        cep: '50777888',
        pessoaId: 2
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enderecos', null, {})
  }
}
