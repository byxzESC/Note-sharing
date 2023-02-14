const router = require("express").Router();
const apiRoutes = require("./api");
const mainpageRoutes = require('./mainpageRoutes');

router.use("/", mainpageRoutes);
router.use("/api", apiRoutes);

router.use("/internal", require("./internal"));

router.use("/note", require("./note"));
module.exports = router;
