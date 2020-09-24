export default (sequelize, DataTypes) => {
    const Generic = sequelize.define(
      'Generic',
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
        tableName: 'generics',
      },
    );
  
  
    return Generic;
  };
  