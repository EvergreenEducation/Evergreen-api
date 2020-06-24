const PROVIDER_TABLE = 'providers';
const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(OFFER_TABLE, 'is_local_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn(OFFER_TABLE, 'is_main_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn(PROVIDER_TABLE, 'is_local_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn(PROVIDER_TABLE, 'is_main_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn(PATHWAY_TABLE, 'is_local_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.addColumn(PATHWAY_TABLE, 'is_main_promo', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(OFFER_TABLE, 'is_local_promo');
    await queryInterface.removeColumn(OFFER_TABLE, 'is_main_promo');
    await queryInterface.removeColumn(PROVIDER_TABLE, 'is_local_promo');
    await queryInterface.removeColumn(PROVIDER_TABLE, 'is_main_promo');
    await queryInterface.removeColumn(PATHWAY_TABLE, 'is_local_promo');
    await queryInterface.removeColumn(PATHWAY_TABLE, 'is_main_promo');
  },
};
