
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      sid: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sessions');
  },
};
