const User = require('./User');
const Note = require('./Note');
const Tag = require('./Tag');

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
Note.hasMany(Tag, {
    foreignKey: 'note_id'
});

Tag.hasMany(Note, {
    foreignKey: 'note_id'
});

module.exports = { User, Note, Tag}