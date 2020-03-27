export default (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
    },
    type: {
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
    topics: {
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
  });

  Provider.associate = models => {};

  return Provider;
};
