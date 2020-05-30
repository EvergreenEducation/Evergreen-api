const ENROLLMENT_TABLE = 'enrollments';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(ENROLLMENT_TABLE, 'start_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(ENROLLMENT_TABLE, 'start_date');
  },
};
