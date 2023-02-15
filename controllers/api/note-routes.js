const router = require("express").Router();
const { Note, User, Tag, TagNote, SharedUsers } = require("../../models");

// routes
// api/note/new || api/note/update/:id || api/note/delete/:id || api/note/all

// ===== for testing
router.get('/all', async (req, res) => {
  Note.findAll({
  //     where: {owner_id: req.session.user_id}
  // },
  // {
    // attributes: ['id', 'title', 'content', 'type', 'owner_id'],
      attributes: ['title', 'content', 'type'],
      include: [
        {
            model: User,
            attributes: ['name'],
            as: 'owner',
        },
        {
          model: User,
          as: "sharedUsers",
          attributes: ['id', 'email', 'name'],
        },
        {
            model: Tag,
            // attributes: ['id', 'color', 'darkColor', 'message', 'filledIn'],
            attributes: ['color', 'darkColor', 'message', 'filledIn'],
            // include: [{
            //     model: User,
            //     attributes: ['name']
            // }],
            as: 'tags'
        }
      ]
  })
  .then(noteData => {
      const notes = noteData.map(note => note.get({ plain: true }))
      res.json(notes);
  })
  .catch(err => {
    console.log(err);
      res.status(500).json(err)
  })
})

router.post("/new", async (req, res) => {
  try {
    const newNote = await Note.create({
      title: req.body.title,
      content: req.body.body,
      type: req.body.type,
      // should be owner_id: req.session.userId=== once we have login done
      owner_id: req.body.owner_id,
    });

    console.log("========added new note========");
    res.status(200).json(newNote);
  } catch (err) {
    console.log("========failed to add new note========");
    console.log(err);
    res.status(500).json(err);
  }
});

//PUT request to update a particular note (identified by ID)
router.put("/update/:id", async (req, res) => {
  try {
    // ============= update tag list
    // find all associated tags to this note from TagNote
    const tagsToUpdate = await TagNote.findAll({
      where: { note_id: req.params.id },
    });
    // get list of current tag_ids
    const tagsToUpdateIds = tagsToUpdate.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const tagsToAdd = req.body.tags
      .filter((tag) => !tagsToUpdateIds.includes(tag.id))
      .map((tag) => {
        return {
          note_id: req.params.id,
          tag_id:tag.id,
        };
      });
    // figure out which ones to remove
    const tagsToRemove = tagsToUpdate
      .filter(({ tag_id }) => !req.body.tags.find(tag=>tag.id===tag_id))
      .map(({ id }) => id);

    // =========== update shared user list
    // find all associated users to this note from SharedUsers
    const usersToUpdate = await SharedUsers.findAll({
      where: { note_id: req.params.id },
    });
    // get list of current user_ids
    const usersToUpdateIds = usersToUpdate.map(({ user_id }) => user_id);
    // create filtered list of new user_ids
    const shareUsersToAdd = req.body.sharedUsers
      .filter((user) => !usersToUpdateIds.includes(user.id))
      .map((user) => {
        return {
          note_id: req.params.id,
          user_id: user.id,
        };
      });
    // figure out which ones to remove
    const shareUsersToRemove = usersToUpdate
      .filter(({ user_id }) => -1 === req.body.sharedUsers.findIndex(su=>su.id===user_id))
      .map(({ id }) => id);

    // ============== run all updating tags and users actions
    await Promise.all([
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
router.delete("/delete/:id", async (req, res) => {
  try {
    // Check if note to delete exists in database
    const noteToDelete = await Note.findByPk(req.params.id)
    if (!noteToDelete) {
      res.status(404).json({ message: "note not found" });
    } else {
      // Delete the note using Note.destroy
      await Note.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log("========succeeded to destroy note");
      res.status(200).end();
    }
  } catch (err) {
    // Catch any error while working with Note.destroy
    console.log("========failed to destroy note========");
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
