module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
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
      occupation: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.addColumn('users', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: true,
    });
    await queryInterface.addColumn('enrollments', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'students', key: 'id' },
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'student_id');
    await queryInterface.removeColumn('enrollments', 'student_id');
    await queryInterface.dropTable('students');
  },
};
