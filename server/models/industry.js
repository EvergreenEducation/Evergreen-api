export default (sequelize, DataTypes) => {
    const Industry = sequelize.define(
      'Industry',
      {
        name: {
          type: DataTypes.STRING,
        },
        user_role: {
          type: DataTypes.STRING,
        },
        user_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: 'industrys',
      },
    );
  
  
    return Industry;
  };
  