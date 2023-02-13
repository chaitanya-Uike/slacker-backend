const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    static associate(models) {
      Channel.belongsTo(models.Server);
      Channel.belongsToMany(models.User, {
        through: "ChannelUser",
        onDelete: "CASCADE",
      });
      Channel.hasMany(models.Message);
    }
  }
  Channel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return Channel;
};
