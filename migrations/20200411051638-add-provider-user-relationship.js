
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'provider_id', {
      type: Sequelize.INTEGER,
      references: { model: 'providers', key: 'id' },
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'provider_id');
  },
};
