export default (sequelize, DataTypes) => {
  const Pathway = sequelize.define('Pathway', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    keywords: {
      type: DataTypes.STRING,
    },
    provider_id: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    related_offers: {
      type: DataTypes.STRING,
    },
    learn_and_earn: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    earnings: {
      type: DataTypes.STRING,
    },
    length: {
      type: DataTypes.DOUBLE,
    },
    length_unit: {
      type: DataTypes.STRING,
    },
    frequency: {
      type: DataTypes.DOUBLE,
    },
    frequency_unit: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.DOUBLE,
    },
    credit_unit: {
      type: DataTypes.STRING,
    },
    pay: {
      type: DataTypes.DOUBLE,
    },
    pay_unit: {
      type: DataTypes.STRING,
    },
    outlook: {
      type: DataTypes.DOUBLE,
    },
  }, {
    tableName: 'pathways',
  });

  Pathway.associate = models => {
    Pathway.belongsToMany(models.DataField, {
      through: 'pathways_datafields',
      foreignKey: 'pathway_id',
      otherKey: 'datafield_id',
    });

    Pathway.addScope('with_datafields', {
      include: [
        {
          model: models.DataField,
        },
      ],
    });

    Pathway.belongsTo(models.Provider);

    Pathway.belongsToMany(models.Offer, {
      as: {
        singular: 'GroupOfOffers',
        plural: 'GroupsOfOffers',
      },
      through: models.OffersPathways,
      foreignKey: 'pathway_id',
      otherKey: 'offer_id',
    });

    Pathway.addScope('with_groups_of_offers', {
      include: [
        {
          attributes: ['name'],
          model: models.Offer,
          as: 'GroupsOfOffers',
          through: {
            attributes: ['group_name'],
          },
        },
      ],
    });

    Pathway.hasMany(models.File, {
      foreignKey: 'fileable_id',
      constraints: false,
      scope: {
        fileable_type: 'pathway',
      },
    });

    Pathway.addScope('with_files', {
      include: [
        { model: models.File },
      ],
    });

    Pathway.addScope('with_details', {
      include: [
        { model: models.File },
        { model: models.DataField },
        {
          attributes: ['name', 'id'],
          model: models.Offer,
          as: 'GroupsOfOffers',
          through: {
            attributes: ['group_name', 'id'],
          },
        },
      ],
    });
  };

  return Pathway;
};
