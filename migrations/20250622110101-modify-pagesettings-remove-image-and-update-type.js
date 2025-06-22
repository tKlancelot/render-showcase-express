'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Suppression de la colonne 'image'
    await queryInterface.removeColumn('page_settings', 'image');
  },

  down: async (queryInterface, Sequelize) => {
    // Remettre la colonne 'image' si on revient en arrière
    await queryInterface.addColumn('page_settings', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};