export default (sequelize, DataTypes) => {
  const StudentPathway = sequelize.define(
    'StudentPathway',
    {
      student_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      pathway_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pathways',
          key: 'id',
        },
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'students_pathways',
    },
  );

  return StudentPathway;
};
