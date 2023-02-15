const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TagNote extends Model {}

TagNote.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
      primaryKey: true,
    },
    note_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "note",
        key: "id",
      },
      primaryKey: true,
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
