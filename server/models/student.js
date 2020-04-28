export default (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    occupation: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'students',
    underscore: true,
  });

  return Student;
};
