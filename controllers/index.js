const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');

router.get("/", (req, res) => {
	res.render("index");
});

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);

module.exports = router;
