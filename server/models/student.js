export default (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      occupation: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'students',
      underscore: true,
    },
  );

  Student.associate = models => {
    Student.hasMany(models.Enrollment, {
      foreignKey: 'student_id',
    });

    Student.addScope('with_enrollments', {
      include: [models.Enrollment],
    });
  };
  return Student;
};
