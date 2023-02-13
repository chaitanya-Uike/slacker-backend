const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    static associate(models) {
      // if server is deleted also delete channels associated with it
      Server.hasMany(models.Channel, { onDelete: "CASCADE" });
      Server.belongsToMany(models.User, { through: "ServerUser" });
    }
  }
  Server.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 15],
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return Server;
};
