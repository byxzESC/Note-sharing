const router = require("express").Router();
const { Note, User, Tag, TagNote, UserNote } = require("../../models");

// routes
// api/note/new || api/note/update/:id || api/note/delete/:id

router.post("/new", async (req, res) => {
  try {
    const newNote = await Note.create({
      title: req.body.title,
      content: req.body.body,
      type: req.body.type,
      user_id: req.session.userId,
    });

    console.log("========added new note========");
    res.status(200).json(newNote);
  } catch (err) {
    console.log("========failed to add new note========");
    res.status(500).json(err);
  }
});

//PUT request to update a particular note (identified by ID)
router.put("/:id", (req, res) => {
  // update note data
  Note.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((note) => {
      // find all associated tags from NoteTag
      return TagNote.findAll({ where: { note_id: req.params.id } });
    })
    .then((noteTags) => {
      // get list of current tag_ids
      const noteTagIds = noteTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newNoteTags = req.body.tagIds
        .filter((tag_id) => !noteTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            note_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const noteTagsToRemove = noteTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        TagNote.destroy({ where: { id: noteTagsToRemove } }),
        TagNote.bulkCreate(newNoteTags),
      ]);
    })
    .then((updatedNoteTags) => res.json(updatedNoteTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//DELETE request to delete particular note identified by ID
router.delete("/:id", async (req, res) => {
  try {
    // Check if note to delete exists in database
    if (await Note.findByPk(req.params.id)) {
      req.status(404).json({ message: "note not found" });
    } else {
      // Delete the note using Note.destroy
      await Note.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log("========succeeded to destroy note");
      res.end();
    }
  } catch (err) {
    // Catch any error while working with Note.destroy
    console.log("========failed to destroy note========");
    res.status(500).json(err);
  }
});

module.exports = router;


