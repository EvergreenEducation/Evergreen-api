module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bannerfiles', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            image_url: {
                type: Sequelize.STRING,
            },
            landing_image: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
            },
            page_url_check: {
                type: Sequelize.STRING,
            },
            page_id: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('bannerfiles');
    },
};