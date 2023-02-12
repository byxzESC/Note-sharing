const router = require("express").Router();
const apiRoutes = require("./api");
const homepageRoutes = require("./home");

router.use("/", homepageRoutes);
router.use("/api", apiRoutes);

router.use("/note", require("./note"));
module.exports = router;
