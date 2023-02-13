const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServerUser extends Model {}
  ServerUser.init(
    {
      isMod: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return ServerUser;
};
