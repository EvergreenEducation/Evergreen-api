export default (sequelize, DataTypes) => {
    const Bannerfile = sequelize.define(
        'Bannerfile',
        {
            landing_image: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
            image_url:{
                type: DataTypes.STRING,
            },
            user_role: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            page_url_check:{
                type: DataTypes.STRING,
            },
            page_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'bannerfiles',
        },
    );


    return Bannerfile;
};
