export default (sequelize, DataTypes) => {
    const Accedration = sequelize.define(
      'Accedration',
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
        tableName: 'accedrations',
      },
    );
  
  
    return Accedration;
  };
  