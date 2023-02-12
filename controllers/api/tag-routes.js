const router = require('express').Router();
const Tag = require('../../models/Tag');

router.post('/new', async (req, res) => {
    try {
        const newTag = await Tag.create({
            color: req.body.color,
            darkColor: req.body.darkColor,
            message: req.body.message,
            filledIn: req.body.filledIn
        })

        res.status(200).json(newTag)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        if (await Tag.findById(req.params.id)) {
            req.status(404).json({message: 'tag not found'})
        } else {
            const updateTag = await Tag.update(
                {
                    color: req.params.color,
                    darkColor: req.params.darkColor,
                    message: req.body.message,
                    filledIn: req.body.filledIn
                },
                {
                    where: {id: req.params.id}
                }
            )
            res.status(200).json(updateTag)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        if (await Tag.findById(req.params.id)) {
            req.status(404).json({message: 'tag not found'})
        } else {
            await Tag.destroy({
                where: {id: req.params.id}
            })
            res.end()
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;