const STUDENT_PATHWAY_TABLE = 'students_pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(STUDENT_PATHWAY_TABLE, 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(STUDENT_PATHWAY_TABLE, 'notes');
  },
};
