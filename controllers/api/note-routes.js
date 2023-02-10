const router = require('express').Router();
const Note = require('../../models/Note');

// create, update, delete notes

router.post('/new', async (req, res) => {
    try {
        const newNote = await Note.create({
            title: req.body.title,
            content: req.body.body,
            type: req.body.type,
            user_id: req.session.userId
        });

        console.log('========added new post========')
        res.status(200).json(newNote);
    } catch (err) {
        console.log('========failed to add new post========')
        res.status(500).json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {

    } catch (err) {
        console.log('========failed to update post========');
        
    }
})









module.exports = router;