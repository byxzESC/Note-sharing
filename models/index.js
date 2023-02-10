const User = require('./User');
const Note = require('./Note');
const Tag = require('./Tag');
const TagNote = require('./TagNote');

// User
User.hasMany(Note, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Note.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Tag, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Tag.belongsTo(User, {
    foreignKey: 'user_id',
})

// Note
// not sure foreign key
Tag.hasMany(Note, {
    through: 'tag_note',
    as: 'notes',
    foreignKey: 'tag_id',
});

Note.hasMany(Tag, {
    through: 'tag_note',
    as: 'tags',
    foreignKey: 'note_id',
});

module.exports = { User, Note, Tag}