export default (sequelize, DataTypes) => {
  const OffersPathways = sequelize.define('OffersPathways', {
    offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'offers',
        key: 'id',
      },
    },
    pathway_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pathways',
        key: 'id',
      },
    },
    group_name: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'offers_pathways',
  });

  return OffersPathways;
};
