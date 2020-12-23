module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('accedrations', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        name: {
            type: Sequelize.STRING,
        },
        user_role: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
        deleted_at: {
          type: Sequelize.DATE,
          default: null,
        },
      });
    },
  
    async down(queryInterface) {
      await queryInterface.dropTable('accedrations');
    },
  };