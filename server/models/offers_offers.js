export default (sequelize, DataTypes) => {
  const OffersOffers = sequelize.define('OffersOffers', {
    offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'offers',
        key: 'id',
      },
    },
    other_offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'offers',
        key: 'id',
      },
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'offers_offers',
  });

  return OffersOffers;
};
