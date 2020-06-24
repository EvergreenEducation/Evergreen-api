const PATHWAYS_TABLE = 'pathways';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PATHWAYS_TABLE, 'group_sort_order', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PATHWAYS_TABLE, 'group_sort_order');
  },
};
