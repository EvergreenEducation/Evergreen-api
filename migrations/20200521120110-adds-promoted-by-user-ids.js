const PROVIDER_TABLE = 'providers';
const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(OFFER_TABLE, 'local_promoted_by_user_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    });
    await queryInterface.addColumn(OFFER_TABLE, 'main_promoted_by_user_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    });
    await queryInterface.addColumn(
      PROVIDER_TABLE,
      'local_promoted_by_user_ids',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [],
      },
    );
    await queryInterface.addColumn(
      PROVIDER_TABLE,
      'main_promoted_by_user_ids',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [],
      },
    );
    await queryInterface.addColumn(
      PATHWAY_TABLE,
      'local_promoted_by_user_ids',
      {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [],
      },
    );
    await queryInterface.addColumn(PATHWAY_TABLE, 'main_promoted_by_user_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      OFFER_TABLE,
      'local_promoted_by_user_ids',
    );
    await queryInterface.removeColumn(OFFER_TABLE, 'main_promoted_by_user_ids');
    await queryInterface.removeColumn(
      PROVIDER_TABLE,
      'local_promoted_by_user_ids',
    );
    await queryInterface.removeColumn(
      PROVIDER_TABLE,
      'main_promoted_by_user_ids',
    );
    await queryInterface.removeColumn(
      PATHWAY_TABLE,
      'local_promoted_by_user_ids',
    );
    await queryInterface.removeColumn(
      PATHWAY_TABLE,
      'main_promoted_by_user_ids',
    );
  },
};
