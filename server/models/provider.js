export default (sequelize, DataTypes) => {
  const Provider = sequelize.define(
    'Provider',
    {
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
      location_type:{
        type: DataTypes.STRING,
        defaultValue: "",
      },
      accreditation:{
        type: DataTypes.STRING,
        defaultValue: "",
      },
      description: {
        type: DataTypes.TEXT,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      pay: {
        type: DataTypes.STRING,
      },
      main_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      banner_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      credit: {
        type: DataTypes.STRING,
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
      keywords: {
        type: DataTypes.STRING,
      },
      news: {
        type: DataTypes.STRING,
      },
      is_local_promo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_main_promo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      custom_page_promo_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      custom_page_local_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      custom_page_promo_routes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      local_promoted_by_user_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      main_promoted_by_user_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      external_url: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'providers',
      underscored: true,
    },
  );

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

    Provider.addScope('with_offers', {
      include: [{ model: models.Offer }],
    });

    Provider.addScope('with_files', {
      include: [{ model: models.File }],
    });

    Provider.addScope('with_details', {
      include: [
        { model: models.Offer },
        { model: models.DataField },
        { model: models.File },
        { model: models.Pathway },
      ],
    });

    Provider.hasMany(models.Offer, {
      foreignKey: 'provider_id',
    });

    Provider.hasMany(models.Pathway, {
      foreignKey: 'provider_id',
    });

    Provider.addScope('with_pathways', {
      include: [{ model: models.Pathway }],
    });

    Provider.hasMany(models.Enrollment, {
      foreignKey: 'provider_id',
    });
  };

  return Provider;
};
