const User = require("./User");
const Note = require("./Note");
const Tag = require("./Tag");
const TagNote = require("./TagNote");
const UserNote = require("./UserNote");

// Share notes
Note.belongsToMany(User, {
  foreignKey: "user_id", // establishes the foreign key for the associating table
  as: "sharedNotes", // table name to be used in the population of queried data
  through: "shared_note", // interim join table name
});

User.belongsToMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE", 
  as: "sharedNotes",
  through: "shared_note",
});

// owner of notes
// Add the hasMany association between the User and Note models, 
// which defines a user as the owner of notes
User.hasMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "notes",
});

Note.belongsTo(User, {
  foreignKey: "user_id",
  as: "owner",
});

// owner of tags
// Add the hasMany association between the User and Tag models, 
// which defines a user as the owner of tags
User.hasMany(Tag, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Tag.belongsTo(User, {
  foreignKey: "user_id",
});

// note has many tags, and tag has many notes 
// Define the belongsToMany association between the Note and Tag models,
// which gives us access to both the associations between notes and tags, and vice versa
Note.belongsToMany(Tag, {
  through: "tag_note",
  as: "tag",
  foreignKey: "note_id",
});

Tag.belongsToMany(Note, {
  through: "tag_note",
  as: "note",
  foreignKey: "tag_id",
});

module.exports = { User, Note, Tag, TagNote, UserNote };
