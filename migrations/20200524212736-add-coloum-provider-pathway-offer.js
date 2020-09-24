'use strict';
const PROVIDER_TABLE = 'providers';
const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';
const DATAFIELD_TABLE='datafields'
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn(OFFER_TABLE, 'is_generic', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
      await queryInterface.addColumn(OFFER_TABLE, 'is_display', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
      await queryInterface.addColumn(OFFER_TABLE, 'generic_type', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn(PROVIDER_TABLE, 'credit', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn(PROVIDER_TABLE, 'pay', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn(DATAFIELD_TABLE, 'industry', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn(DATAFIELD_TABLE, 'is_check_topic', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
