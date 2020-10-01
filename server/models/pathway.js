export default (sequelize, DataTypes) => {
  const Pathway = sequelize.define(
    'Pathway',
    {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
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
        defaultValue: 0
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
      location_type:{
        type: DataTypes.STRING,
        defaultValue: "",
      },
      pay_unit: {
        type: DataTypes.STRING,
      },
      outlook: {
        type: DataTypes.STRING,
        defaultValue: 0
      },
      main_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      banner_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      is_local_promo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_main_promo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rubric_attachment: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
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
      group_sort_order: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      external_url: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'pathways',
    },
  );

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

    Pathway.belongsToMany(models.Student, {
      as: { singular: 'StudentPathway', plural: 'StudentsPathways' },
      through: models.StudentPathway,
      foreignKey: 'pathway_id',
      otherKey: 'student_id',
    });

    Pathway.hasMany(models.File, {
      foreignKey: 'fileable_id',
      constraints: false,
      scope: {
        fileable_type: 'pathway',
      },
    });

    Pathway.addScope('with_files', {
      include: [{ model: models.File }],
    });

    Pathway.addScope('with_details', {
      include: [
        { model: models.File },
        { model: models.DataField },
        { model: models.Provider },
        {
          model: models.Student,
          as: 'StudentsPathways',
        },
        {
          model: models.Offer,
          as: 'GroupsOfOffers',
        },
      ],
    });
  };

  return Pathway;
};
