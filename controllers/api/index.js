const router = require("express").Router();
const noteRoutes = require("./note-routes");
const tagRoutes = require("./tag-routes");
const userRoutes = require("./user-routes");

// api/note/new || api/note/update/:id || api/note/delete/:id
router.use("/note", noteRoutes);

// api/tag/new || api/note/tag/:id || api/note/tag/:id
router.use("/tag", tagRoutes);

// api/user/new || api/user/update/:id || api/user/delete/:id
router.use("/user", userRoutes);

module.exports = router;
