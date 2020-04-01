const TABLE_NAME = 'providers';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(TABLE_NAME, 'financial_aid', {
      type: Sequelize.STRING,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn(TABLE_NAME, 'financial_aid');
  },
};
