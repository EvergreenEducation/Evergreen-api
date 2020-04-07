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
    groups_of_offers: {
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

    Pathways.belongsTo(models.Provider);
  };

  return Pathway;
};
