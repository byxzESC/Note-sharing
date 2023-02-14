const router = require('express').Router()
const sequelize = require('../config/connection')
const { Tag, User, Note } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Note.findAll({
        where: {user_id: req.session.user_id}
    },
    {
        attributes: ['id', 'title', 'content', 'type', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Tag,
                attributes: ['id', 'color', 'darkColor', 'message', 'filledIn'],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }
        ]
    })
    .then(noteData => {
        const notes = noteData.map(note => note.get({ plain: true }))
        res.render('pages/home', { notes, loggedIn: true })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', withAuth, (req, res) => {
    Note.findOne({
        where: { id: req.params.id},
        attributes: ['id', 'title', 'content', 'type', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Tag,
                attributes: ['id', 'color', 'darkColor', 'message', 'filledIn'],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }
        ]
    })
    .then(noteData => {
        if (!noteData) {
            res.status(404).json({ message: 'No note found'})
            return
        }

        const note = noteData.get({ plain: true })
        res.render('pages/home', { note, loggedIn: true})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router