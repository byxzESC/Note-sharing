const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TagNote extends Model {}

TagNote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
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
    modelName: "tag_note",
  }
);

module.exports = TagNote;
