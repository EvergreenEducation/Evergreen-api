const TABLE_NAME = 'enrollments';

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
      student_id: {
        type: Sequelize.INTEGER,
      },
      credit: {
        type: Sequelize.STRING,
      },
      activation_code: {
        type: Sequelize.STRING,
      },
      status: {
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
