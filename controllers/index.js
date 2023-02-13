const router = require("express").Router();
const apiRoutes = require("./api");
const homepageRoutes = require("./homepageRoutes");
const mainpageRoutes = require('./mainpageRoutes');


router.use("/", mainpageRoutes);
router.use("/homepage", homepageRoutes);
router.use("/api", apiRoutes);

router.use("/internal", require("./internal"));

router.use("/note", require("./note"));
module.exports = router;
