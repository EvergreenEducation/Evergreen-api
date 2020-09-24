'use strict';
const PDF_TABLE ="files"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      PDF_TABLE,
      'pdf_link',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );

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
