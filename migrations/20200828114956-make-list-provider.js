'use strict';
const PROVIDER_TABLE = 'providers';
const OFFER_TABLE = 'offers';
const PATHWAY_TABLE = 'pathways';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      PROVIDER_TABLE,
      'location_type',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );
    await queryInterface.addColumn(
      PATHWAY_TABLE,
      'location_type',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );
    await queryInterface.addColumn(
      OFFER_TABLE,
      'location_type',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );
    await queryInterface.addColumn(
      PROVIDER_TABLE,
      'accreditation',
      {
        type: Sequelize.STRING,
        defaultValue: "",
      },
    );
    await queryInterface.addColumn(OFFER_TABLE, 'main_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(OFFER_TABLE, 'banner_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(PROVIDER_TABLE, 'main_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(PROVIDER_TABLE, 'banner_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(PATHWAY_TABLE, 'main_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(PATHWAY_TABLE, 'banner_image', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(OFFER_TABLE, 'rubric_attachment', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
    await queryInterface.addColumn(PATHWAY_TABLE, 'rubric_attachment', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      defaultValue: [],
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
