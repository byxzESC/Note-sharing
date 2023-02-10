const User = require("./User");
const Note = require("./Note");
const Tag = require("./Tag");
const TagNote = require("./TagNote");
const UserNote = require("./UserNote");

// User
Note.belongsToMany(User, {
  foreignKey: "user_id",
  as: "sharedNotes",
  through: "shared_note",
});

User.belongsToMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "sharedNotes",
  through: "shared_note",
});

User.hasMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "notes",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
  as: "notes",
});

User.hasMany(Tag, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Tag.belongsTo(User, {
  foreignKey: "user_id",
});

// UserNote manyToMany relationship
User.hasMany(Note, {
  through: "user_note",
  as: "note",
  foreignKey: "user_id",
});

Note.hasMany(User, {
  through: "user_note",
  as: "user",
  foreignKey: "note_id",
});

// TagNote manyToMany relationship
Tag.hasMany(Note, {
  through: "tag_note",
  as: "note",
  foreignKey: "tag_id",
});

Note.hasMany(Tag, {
  through: "tag_note",
  as: "tag",
  foreignKey: "note_id",
});

module.exports = { User, Note, Tag };
