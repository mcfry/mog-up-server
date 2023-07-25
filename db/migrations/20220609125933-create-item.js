"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itemLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      displaySlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      displayId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      relatedDisplayIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
