const router = require("express").Router();
const { Note, User, Tag, TagNote, SharedUsers } = require("../../models");

router.get("/get/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id, {
      include: [
        { model: User, as: "sharedUsers", through: { attributes: [] } },
        { model: Tag, as: "tags", through: { attributes: [] } },

      ]
    });
    res.json(note)
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server error"}); 
  }
});

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
router.put("/:id", async (req, res) => {
  try {
    // ============= update tag list
    // find all associated tags to this note from TagNote
    const tagsToUpdate = await TagNote.findAll({
      where: { note_id: req.params.id },
    });
    // get list of current tag_ids
    const tagsToUpdateIds = tagsToUpdate.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const tagsToAdd = req.body.tag_id
      .filter((tag_id) => !tagsToUpdateIds.includes(tag_id))
      .map((tag_id) => {
        return {
          note_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const tagsToRemove = tagsToUpdate
      .filter(({ tag_id }) => !req.body.tag_id.includes(tag_id))
      .map(({ id }) => id);

    // =========== update shared user list
    // find all associated users to this note from SharedUsers
    const usersToUpdate = await SharedUsers.findAll({
      where: { note_id: req.params.id },
    });
    // get list of current user_ids
    const usersToUpdateIds = usersToUpdate.map(({ user_id }) => user_id);
    // create filtered list of new user_ids
    const shareUsersToAdd = req.body.user_id
      .filter((user_id) => !usersToUpdateIds.includes(user_id))
      .map((user_id) => {
        return {
          note_id: req.params.id,
          user_id,
        };
      });
    // figure out which ones to remove
    const shareUsersToRemove = usersToUpdate
      .filter(({ user_id }) => !req.body.user_id.includes(user_id))
      .map(({ id }) => id);

    // ============== run all updating tags and users actions
    Promise.all([
      TagNote.destroy({ where: { id: tagsToRemove } }),
      TagNote.bulkCreate(tagsToAdd),

      SharedUsers.destroy({ where: { id: shareUsersToRemove } }),
      SharedUsers.bulkCreate(shareUsersToAdd),
    ]);

    // update note data
    const updateNote = await Note.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json(updateNote);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
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
