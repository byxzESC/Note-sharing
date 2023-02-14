const router = require("express").Router();
const { render } = require("ejs");
const sequelize = require('../config/connection')
const { User, Tag, Note } = require('../models')
// Kyler_Ortiz17@yahoo.com - 1jwVH5JIkW8kzp6
router.get('/', async (req, res) => {
    const notesData = await Note.findAll({
        //     where: {owner_id: req.session.user_id}
        // },
        // {
          // attributes: ['id', 'title', 'content', 'type', 'owner_id'],
            attributes: ['title', 'content', 'type'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    as: 'owner',
                },
                {
                    model: Tag,
                    // attributes: ['id', 'color', 'darkColor', 'message', 'filledIn'],
                    attributes: ['color', 'darkColor', 'message', 'filledIn'],
                    // include: [{
                    //     model: User,
                    //     attributes: ['name']
                    // }],
                    as: 'tags'
                }
            ]
        })
    const notes = notesData.map(note => note.get({ plain: true }));
    console.log(notes);
    res.render('pages/home', { notes } );
})
// router.get('/', (req, res) => {
//     Note.findAll({
//         attributes: [
//             'id',
//             'title',
//             'content',
//             'type',
//             'user_id'
//         ],

//         order: [['note_id', 'DESC']],

//         include: [
//             {
//                 model: User,
//                 attributes: ['name']
//             },
//             {
//                 model: Tag,
//                 attributes: [
//                     'id',
//                     'color',
//                     'darkColor',
//                     'message',
//                     'filledIn'
//                 ],
//                 include: [{
//                     model: User,
//                     attributes: ['name']
//                 }]
//             }
//         ]
//     })
//     .then(dbNoteData => {
//         const notes = dbNoteData.map(note => note.get({ plain: true }));
//         console.log(req.session);
//         res.render('homepage', {
//             notes,
//             loggedIn: req.session.loggedIn
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json(err)
//     })
// })

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

        res.render('/login', {
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

    res.render('pages/auth', {
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

router.get("/landing", (req, res) => {
    res.render("pages/landing");
  })

module.exports = router;