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
    // schema: 'dataFields', 
    tableName: 'datafields',
  });

  DataFields.associate = models => {
    DataFields.belongsToMany(models.Provider, {
      through: models.ProviderDataFields,
      foreignKey: 'provider_id',
      otherKey: 'id',
    });
  };

  return DataFields;
};
