
export default (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  return Session;
};
