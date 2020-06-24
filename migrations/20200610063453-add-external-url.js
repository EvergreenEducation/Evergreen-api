const OFFER_TABLE = 'offers';
const PROVIDER_TABLE = 'providers';
const PATHWAY_TABLE = 'pathways';
const EXTERNAL_URL_FIELD = 'external_url';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PROVIDER_TABLE, EXTERNAL_URL_FIELD, {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn(OFFER_TABLE, EXTERNAL_URL_FIELD, {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn(PATHWAY_TABLE, EXTERNAL_URL_FIELD, {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROVIDER_TABLE, EXTERNAL_URL_FIELD);
    await queryInterface.removeColumn(OFFER_TABLE, EXTERNAL_URL_FIELD);
    await queryInterface.removeColumn(PATHWAY_TABLE, EXTERNAL_URL_FIELD);
  },
};
