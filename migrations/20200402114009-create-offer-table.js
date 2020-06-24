const TABLE_NAME = 'offers';

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
      start_date: {
        type: Sequelize.DATE,
      },
      keywords: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      related_offers: {
        type: Sequelize.STRING,
      },
      prerequisites: {
        type: Sequelize.STRING,
      },
      topics: {
        type: Sequelize.STRING,
      },
      learn_and_earn: {
        type: Sequelize.STRING,
      },
      part_of_day: {
        type: Sequelize.STRING,
      },
      frequency: {
        type: Sequelize.DOUBLE,
      },
      frequency_unit: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.DOUBLE,
      },
      cost_unit: {
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
      length: {
        type: Sequelize.DOUBLE,
      },
      length_unit: {
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
