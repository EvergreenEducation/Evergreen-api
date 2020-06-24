export default (sequelize, DataTypes) => {
  const Enrollment = sequelize.define(
    'Enrollment',
    {
      student_id: DataTypes.INTEGER,
      offer_id: DataTypes.INTEGER,
      provider_id: DataTypes.INTEGER,
      credit: DataTypes.STRING,
      activation_code: DataTypes.STRING,
      status: DataTypes.STRING,
      // {
      //    inactive: when enrollment is created
      //    pending: when it is send out via email (for later)
      //    activated: when user enroll in the offer
      //    processing: when provider grading
      //    approved: when provider approve the final grade/certificate
      // }
      start_date: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'enrollments',
    },
  );

  Enrollment.associate = models => {
    Enrollment.belongsTo(models.Offer);
    Enrollment.belongsTo(models.Provider);
    Enrollment.belongsTo(models.Student);
  };

  Enrollment.STATUSES = [
    'Inactivate',
    'Completed',
    'Approved',
    'Failed',
    'Unenrolled',
  ];

  return Enrollment;
};
