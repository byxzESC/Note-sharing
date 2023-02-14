const router = require("express").Router();
const apiRoutes = require("./api");
const homepageRoutes = require("./homepageRoutes");
const mainpageRoutes = require('./mainpageRoutes');
const homeRoutes = require('./home')

router.use("/", mainpageRoutes);
router.use("/homepage", homepageRoutes);
router.use("/home", homeRoutes)
router.use("/api", apiRoutes);

router.use("/internal", require("./internal"));

router.use("/note", require("./note"));
module.exports = router;
