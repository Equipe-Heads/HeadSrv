'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Usuarios','nivel',{type: Sequelize.INTEGER},),]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Usuarios','nivel'),]);      
  },
};
