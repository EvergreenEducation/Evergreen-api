const TABLE_NAME = 'offers_pathways';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      offer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'offers',
          key: 'id',
        },
      },
      pathway_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pathways',
          key: 'id',
        },
      },
      group_name: {
        type: Sequelize.STRING,
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
