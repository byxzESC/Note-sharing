const router = require("express").Router();
const Note = require("../../models/Note");

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
router.put("/update/:id", async (req, res) => {
  try {
    // Check if note to delete exists in database
    if (await Note.findById(req.params.id)) {
      req.status(404).json({message: 'note not found'})
    } else {
      // Update the note using Note.update
      const updateNote = await Note.update(
        {
          title: req.body.title,
          content: req.body.content,
          type: req.body.type,
          user_id: req.session.userId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      console.log("========succeeded to update note")
      res.status(200).json(updateNote);
    }
  } catch (err) {
  // Catch any error while working with Note.update
    console.log("========failed to update note========");
    res.status(500).json(err);
  }
});

//DELETE request to delete particular note identified by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    // Check if note to delete exists in database
    if (await Note.findById(req.params.id)) {
      req.status(404).json({message: 'note not found'})
    } else {
      // Delete the note using Note.destroy
      await Note.destroy({
        where: {
          id: req.params.id,
        }
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
