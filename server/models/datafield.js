export default (sequelize, DataTypes) => {
  const DataField = sequelize.define(
    'DataField',
    {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'datafields',
    },
  );

  DataField.associate = models => {
    DataField.belongsToMany(models.Provider, {
      through: 'providers_datafields',
      foreignKey: 'datafield_id',
      otherKey: 'provider_id',
    });

    DataField.belongsToMany(models.Offer, {
      through: 'offers_datafields',
      foreignKey: 'datafield_id',
      otherKey: 'offer_id',
    });

    DataField.belongsToMany(models.Pathway, {
      through: 'pathways_datafields',
      foreignKey: 'datafield_id',
      otherKey: 'pathway_id',
    });

    DataField.addScope('with_offers', {
      include: [
        {
          model: models.Offer,
          attributes: ['id', 'name'],
        },
      ],
    });
  };

  return DataField;
};
