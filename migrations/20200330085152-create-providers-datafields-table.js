const TABLE_NAME = 'providers_datafields';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'providers',
          key: 'id',
        },
      },
      datafield_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'datafields',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
