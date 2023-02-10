const router = require('express').Router();
const noteRoutes = require('./note-routes');
const tagRoutes = require('./tag-routes');
const userRoutes = require('./user-routes');

router.use('/note', noteRoutes);
router.use('/tag', tagRoutes);
router.use('/user', userRoutes);

module.exports = router;