const router = require("express").Router();
const apiRoutes = require("./api");
const mainpageRoutes = require('./mainpageRoutes');

// routes list
    // landing page '/landing'  without Auth direct to here
    // root route   '/'     with loggedIn all notes show list a titles     
    // note view    '/internal/doc'
    // note edit    '/internal/doc/edit'
    // login/signup 'auth'

router.use("/", mainpageRoutes);
router.use("/api", apiRoutes);

router.use("/internal", require("./internal"));

router.use("/note", require("./note"));
module.exports = router;
