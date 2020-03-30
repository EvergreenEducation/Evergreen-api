export default (sequelize, DataTypes) => {
  const DataFields = sequelize.define('DataFields', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'datafields',
  });

  DataFields.associate = models => {
    DataFields.belongsToMany(models.Provider, {
      through: 'providers_datafields',
      foreignKey: 'provider_id',
      otherKey: 'id',
    });
  };

  return DataFields;
};
