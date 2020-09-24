'use strict';
const PDF_TABLE ="files"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      PDF_TABLE,
      'user_role',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );
  await queryInterface.addColumn(
      PDF_TABLE,
      'user_id',
      {
        type: Sequelize.INTEGER,
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
