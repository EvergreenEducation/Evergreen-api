export default (sequelize, DataTypes) => {
  const Offers = sequelize.define('Offers', {
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
      type: DataTypes.STRING,
    },
    related_offers: {
      type: DataTypes.STRING,
    },
    prerequisites: {
      type: DataTypes.STRING,
    },
    topics: {
      type: DataTypes.STRING,
    },
    learn_and_earn: {
      type: DataTypes.STRING,
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
  }, {
    tableName: 'offers',
  });

  return Offers;
};
