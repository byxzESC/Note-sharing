const router = require('express').Router()
const sequelize = require('../config/connection')
const { Tag, User, Note } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Note.findAll({
        where: {user_id: req.session.user_id}
    })
})

module.exports = router