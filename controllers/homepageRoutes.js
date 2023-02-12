const router = require("express").Router();
const { render } = require("ejs");
const sequelize = require('../config/connection')
const { User, Tag, Note } = require('../models')

router.get('/', (req, res) => {
    Note.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'type',
            'user_id'
        ],

        order: [['note_id', 'DESC']],

        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Tag,
                attributes: [
                    'id',
                    'color',
                    'darkColor',
                    'message',
                    'filledIn'
                ],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }
        ]
    })
    .then(dbNoteData => {
        const notes = dbNoteData.map(note => note.get({plain:true}));
        res.render('homepage.ejs', {
            notes,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/note/:id', (req,res) => {
    Note.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'title',
            'content',
            'type',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Tag,
                attributes: [
                    'id',
                    'color',
                    'darkColor',
                    'message',
                    'filledIn'
                ],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }
        ]
    })
    .then(dbNoteData => {
        if (!dbNoteData) {
            res.status(404).json({message: 'No note found with that id!'})
            return
        }

        const note = dbNoteData.get({ plain: true })

        res.render('/login.ejs', {
            note,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login.ejs', {
        loggedIn: req.session.loggedIn
    })
})

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('signUp', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;