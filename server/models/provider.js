export default (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
    },
    learn_and_earn: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.DOUBLE,
    },
    pay: {
      type: DataTypes.DOUBLE,
    },
    credit: {
      type: DataTypes.DOUBLE,
    },
    contact: {
      type: DataTypes.JSON,
    },
    logo: {
      type: DataTypes.STRING,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
    },
    financial_aid: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'providers',
  });

  Provider.associate = models => {
    Provider.belongsToMany(models.DataField, {
      through: 'providers_datafields',
      foreignKey: 'provider_id',
      otherKey: 'datafield_id',
    });

    Provider.hasMany(models.File, {
      foreignKey: 'fileable_id',
      constraints: false,
      scope: {
        fileable_type: 'provider',
      },
    });

    Provider.addScope('with_datafields', {
      include: [
        {
          model: models.DataField,
        },
      ],
    });

    Provider.hasMany(models.Offer, {
      foreignKey: 'provider_id',
    });
  };

  return Provider;
};
