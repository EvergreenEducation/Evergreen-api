const TABLE_NAME = 'pathways';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      keywords: {
        type: Sequelize.STRING,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'providers',
          key: 'id',
        },
      },
      category: {
        type: Sequelize.STRING,
      },
      related_offers: {
        type: Sequelize.STRING,
      },
      topics: {
        type: Sequelize.STRING,
      },
      learn_and_earn: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      earnings: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.DOUBLE,
      },
      length_unit: {
        type: Sequelize.STRING,
      },
      frequency: {
        type: Sequelize.DOUBLE,
      },
      frequency_unit: {
        type: Sequelize.STRING,
      },
      credit: {
        type: Sequelize.DOUBLE,
      },
      credit_unit: {
        type: Sequelize.STRING,
      },
      pay: {
        type: Sequelize.DOUBLE,
      },
      pay_unit: {
        type: Sequelize.STRING,
      },
      outlook: {
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
