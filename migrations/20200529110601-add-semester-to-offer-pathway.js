const OFFERS_PATHWAYS_TABLE = 'offers_pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(OFFERS_PATHWAYS_TABLE, 'semester', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(OFFERS_PATHWAYS_TABLE, 'semester');
  },
};
