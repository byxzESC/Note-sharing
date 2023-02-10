const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    // for create time and update time
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'note',
  }
);

module.exports = Note;


// created_at: {
//   type: DataTypes.DATE,
//   allowNull: false,
//   defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
// },
// update_at: {
// type: DataTypes.DATE,
// defaultValue: sequelize.literal(
//   "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
// ),
// },