"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      displaySlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      displayId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      relatedDisplayIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
