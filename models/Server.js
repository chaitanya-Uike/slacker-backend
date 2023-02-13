const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    static associate(models) {}
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
    }
  );

  return Server;
};
