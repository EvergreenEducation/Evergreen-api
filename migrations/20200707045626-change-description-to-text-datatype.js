const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';
const PROVIDER_TABLE = 'providers';
const DATAFIELD_TABLE = 'datafields';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(DATAFIELD_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(PROVIDER_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(OFFER_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(PATHWAY_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(DATAFIELD_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(PROVIDER_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(OFFER_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.changeColumn(PATHWAY_TABLE, 'description', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
  },
};
