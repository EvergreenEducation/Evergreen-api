export default (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    student_id: DataTypes.INTEGER,
    offer_id: DataTypes.INTEGER,
    credit: DataTypes.STRING,
    activation_code: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    tableName: 'enrollments',
  });

  Enrollment.associate = models => {
    Enrollment.belongsTo(models.Offer);
    Enrollment.belongsTo(models.Provider);
  };

  return Enrollment;
};
