const STUDENT_PATHWAY_TABLE = 'students_pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(STUDENT_PATHWAY_TABLE, 'notes', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(STUDENT_PATHWAY_TABLE, 'notes', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
