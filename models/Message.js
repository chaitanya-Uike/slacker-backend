const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Channel);
      Message.belongsTo(models.User, {
        foreignKey: "senderId",
      });
    }
  }
  Message.init(
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return Message;
};
