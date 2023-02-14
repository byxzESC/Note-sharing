const User = require("./User");
const Note = require("./Note");
const Tag = require("./Tag");
const TagNote = require("./TagNote");
const SharedUsers = require("./SharedUsers");

User.belongsToMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "visibleNotes",
  through: SharedUsers,
});
// Share notes
Note.belongsToMany(User, {
  foreignKey: "note_id", // establishes the foreign key for the associating table
  as: "sharedUsers", // table name to be used in the population of queried data
  through: SharedUsers, // interim join table name
});

// note has many tags, and tag has many notes
// Define the belongsToMany association between the Note and Tag models,
// which gives us access to both the associations between notes and tags, and vice versa
Note.belongsToMany(Tag, {
  through: "tag_note",
  as: "tags",
  foreignKey: "note_id",
});

Tag.belongsToMany(Note, {
  through: "tag_note",
  as: "notes",
  foreignKey: "tag_id",
});

// owner of notes
// Add the hasMany association between the User and Note models,
// which defines a user as the owner of notes
User.hasMany(Note, {
  foreignKey: "owner_id",
  onDelete: "CASCADE",
  as: "notes",
});

Note.belongsTo(User, {
  foreignKey: "owner_id",
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

module.exports = { User, Note, Tag, TagNote, SharedUsers };
