export default (sequelize, DataTypes) => {
  const ProviderDataFields = sequelize.define('ProviderDataFields', {
    provider_id: {
      type: DataTypes.STRING,
      references: {
        model: 'providers',
        key: 'id',
      },
    },
    data_field_id: {
      type: DataTypes.STRING,
      references: {
        model: 'datafields',
        key: 'id',
      },
    },
  },
  {
    // schema: 'providerDataFields',
    tableName: 'provider_datafields',
  });

  ProviderDataFields.associate = models => {
    ProviderDataFields.belongsToMany(models.DataFields, {
      through: models.ProviderDataFields,
      foreignKey: 'data_field_id',
      otherKey: 'id',
    });

    ProviderDataFields.belongsToMany(models.Provider, {
      through: models.ProviderDataFields,
      foreignKey: 'provider_id',
      otherKey: 'id',
    });
  };

  return ProviderDataFields;
};
