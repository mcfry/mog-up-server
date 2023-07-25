"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mog = sequelize.define(
    "Mog",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mogName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      itemList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      itemOverrides: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      race: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      modelBgColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );

  Mog.associate = function (models) {
    // associations can be defined here
    Mog.hasMany(models.Rating, {
      as: "ratings",
      foreignKey: "mogId",
    });
  };

  return Mog;
};
