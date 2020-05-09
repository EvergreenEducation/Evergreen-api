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

    Student.belongsToMany(models.Pathway, {
      as: { singular: 'StudentPathway', plural: 'StudentPathways' },
      through: models.StudentPathway,
      foreignKey: 'student_id',
      otherKey: 'pathway_id',
    });

    Student.addScope('with_details', {
      include: [
        {
          model: models.Pathway,
          as: 'StudentPathways',
          attributes: ['id', 'name', 'provider_id'],
          include: [
            {
              model: models.Provider,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: models.Enrollment,
          attributes: [
            'id',
            'status',
            'offer_id',
            'provider_id',
            'credit',
            'activation_code',
            'createdAt',
          ],
        },
      ],
    });
  };
  return Student;
};
