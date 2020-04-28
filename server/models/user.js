
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    auth0_user_id: DataTypes.STRING,
  }, { underscored: true });

  User.associate = models => {
    User.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
    });
    User.belongsTo(models.Student, {
      foreignKey: 'student_id',
    });
  };

  return User;
};
