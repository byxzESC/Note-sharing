const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SharedUsers extends Model {}

SharedUsers.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    note_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "note",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "shared_users",
  }
);

module.exports = SharedUsers;
