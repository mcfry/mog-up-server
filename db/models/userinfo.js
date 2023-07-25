"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInfo.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "member", // member, admin
      },
      firebaseUid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserInfo",
    }
  );
  return UserInfo;
};
