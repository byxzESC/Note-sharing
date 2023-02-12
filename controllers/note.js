const { Note, Tag, User } = require("../models");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id, {
    include: [
      {
        model: Tag,
        as: "tag",
      },
      {
        model: User,
        as: "owner",
      },
    ],
  });

  const isMyNote = req.session.user_id === note.owner.id;
  res.render("note", {
    loggedIn: req.session.loggedIn,
    type: isMyNote ? "editor" : "render",
    note: note.get({ plain: true }),
  });
});

module.exports = router;
