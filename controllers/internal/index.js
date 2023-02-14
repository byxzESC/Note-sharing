const router = require("express").Router();

router.use("/doc", require("./doc"));

module.exports = router;