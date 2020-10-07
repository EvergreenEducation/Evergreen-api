import { Provider } from '@/models';

export default (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offer',
    {
      name: {
        type: DataTypes.STRING,
      },
      provider_id: {
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      keywords: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      learn_and_earn: {
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
      part_of_day: {
        type: DataTypes.STRING,
      },
      frequency: {
        type: DataTypes.DOUBLE,
      },
      frequency_unit: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.DOUBLE,
      },
      cost_unit: {
        type: DataTypes.STRING,
      },
      credit: {
        type: DataTypes.DOUBLE,
      },
      location_type:{
        type: DataTypes.STRING,
        defaultValue: "",
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
      length: {
        type: DataTypes.DOUBLE,
      },
      length_unit: {
        type: DataTypes.STRING,
      },
      rubric_attachment: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      main_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      banner_image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      is_generic : {
        type: DataTypes.BOOLEAN
      },
      is_display : {
        type: DataTypes.BOOLEAN
      },
      generic_type : {
        type : DataTypes.STRING,
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
      tableName: 'offers',
    },
  );

  Offer.associate = models => {
    Offer.belongsTo(models.Provider);
    Offer.belongsToMany(models.DataField, {
      through: 'offers_datafields',
      foreignKey: 'offer_id',
      otherKey: 'datafield_id',
    });

    Offer.belongsToMany(models.Pathway, {
      as: {
        singular: 'GroupOfOffers',
        plural: 'GroupsOfOffers',
      },
      through: models.OffersPathways,
      foreignKey: 'offer_id',
      otherKey: 'pathway_id',
    });

    Offer.addScope('with_datafields', {
      include: [
        {
          model: models.DataField,
        },
      ],
    });

    Offer.belongsToMany(Offer, {
      as: {
        singular: 'RelatedOffer',
        plural: 'RelatedOffers',
      },
      through: models.OffersOffers,
      foreignKey: 'offer_id',
      otherKey: 'other_offer_id',
      unique: true,
    });

    Offer.belongsToMany(Offer, {
      as: {
        singular: 'PrerequisiteOffer',
        plural: 'PrerequisiteOffers',
      },
      through: models.OffersOffers,
      foreignKey: 'offer_id',
      otherKey: 'other_offer_id',
      unique: true,
    });

    Offer.addScope('with_related_offers', {
      include: [
        {
          model: Offer,
          as: 'RelatedOffers',
          through: {
            attributes: [],
            where: { type: 'related' },
          },
        },
      ],
    });

    Offer.addScope('with_prerequisite_offers', {
      include: [
        {
          model: Offer,
          as: 'PrerequisiteOffers',
          through: {
            attributes: [],
            where: { type: 'prerequisite' },
          },
        },
      ],
    });

    Offer.hasMany(models.File, {
      foreignKey: 'fileable_id',
      constraints: false,
      scope: {
        fileable_type: 'offer',
      },
    });

    Offer.addScope('with_files', {
      include: [{ model: models.File }],
    });

    Offer.addScope('with_details', {
      include: [
        { model: models.Provider, attributes: ['id', 'name', 'location'] },
        {
          model: Offer,
          as: 'PrerequisiteOffers',
          through: {
            attributes: [],
            where: { type: 'prerequisite' },
          },
        },
        {
          model: Offer,
          as: 'RelatedOffers',
          through: {
            attributes: [],
            where: { type: 'related' },
          },
        },
        { model: models.File },
        { model: models.DataField },
        {
          model: models.Pathway,
          as: {
            singular: 'GroupOfOffers',
            plural: 'GroupsOfOffers',
          },
        },
      ],
    });

    Offer.hasMany(models.Enrollment, {
      foreignKey: 'offer_id',
    });
  };

  return Offer;
};
