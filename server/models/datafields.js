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
      foreignKey: 'datafield_id',
      otherKey: 'provider_id',
    });

    DataFields.belongsToMany(models.Offer, {
      through: 'offers_datafields',
      foreignKey: 'datafield_id',
      otherKey: 'offer_id',
    });

    DataFields.belongsToMany(models.Pathways, {
      through: 'pathways_datafields',
      foreignKey: 'datafield_id',
      otherKey: 'pathway_id',
    });
  };

  return DataFields;
};
