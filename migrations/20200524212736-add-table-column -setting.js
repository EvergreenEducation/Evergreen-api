module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('settings', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            page_route: {
                type: Sequelize.STRING,
            },
            user_id:{
                type: Sequelize.INTEGER,
            },
            user_role: {
                type: Sequelize.STRING,
            },
            topic_id: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
            },
            banner_image: {
                type: Sequelize.STRING,
            },
            image_url: {
                type: Sequelize.STRING,
            },
            main_promo: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
            },
            local_promo: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: [],
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
        await queryInterface.dropTable('settings');
    },
};