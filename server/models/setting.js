export default (sequelize, DataTypes) => {
    const Setting = sequelize.define(
        'Setting',
        {
            page_route: {
                type: DataTypes.STRING,
            },
            user_role: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            topic_id: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
            banner_image: {
                type: DataTypes.STRING,
            },
            image_url: {
                type: DataTypes.STRING
            },
            main_promo: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
            local_promo: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            }
        },
        {
            tableName: 'settings',
        },
    );


    return Setting;
};
