
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('providers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      learn_and_earn: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      topics: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.DOUBLE,
      },
      contact: {
        type: Sequelize.JSON,
      },
      logo: {
        type: Sequelize.STRING,
      },
      is_public: {
        type: Sequelize.BOOLEAN,
      },
      keywords: {
        type: Sequelize.STRING,
      },
      news: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('providers');
  },
};
