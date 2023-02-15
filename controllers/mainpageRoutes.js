const router = require("express").Router();
const { render } = require("ejs");
const sequelize = require('../config/connection')
const { User, Tag, Note } = require('../models')
const withAuth = require('../utils/auth');
// Grayce.Kerluke58 - Bailey9@hotmail.com - PCZn3SSr6JvkGoq
router.get('/home', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    const user = await User.findByPk(req.session.userId, {
        include: [
            {
                model: Note,
                as: "notes",
                attributes: ["id",'title'],
            },
            {
                model: Note,
                as: "visibleNotes",
                attributes: ["id",'title'],
            },
        ],
    });
    const notesData = [...user.notes, ...user.visibleNotes];
    const notes = notesData.map(note => note.get({ plain: true }));
    console.log(notes);
    res.render('pages/home', { notes, loggedIn: req.session.loggedIn} );
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

        res.render('/home', {
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
        res.redirect('/home');
        return;
    }

    res.render('pages/auth', {
        loggedIn: req.session.loggedIn
    })
})

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home')
        return
    }

    res.render('signUp', {
        loggedIn: req.session.loggedIn
    })
})

router.get("/", (req, res) => {
    res.render("pages/landing");
})

module.exports = router;