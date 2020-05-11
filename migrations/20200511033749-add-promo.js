module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('offers', 'is_local_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn('offers', 'is_main_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('offers', 'is_local_promo');
    await queryInterface.removeColumn('offers', 'is_main_promo');
  },
};
