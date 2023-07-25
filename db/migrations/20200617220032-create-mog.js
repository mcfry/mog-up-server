"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Mogs", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mogName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemList: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      itemOverrides: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      race: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      modelBgColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Mogs");
  },
};
