const { Note, Tag, User } = require("../../models");

const router = require("express").Router();

async function userAllowedAccessToDoc(req, res, next) {
	try {
		const user = await User.findByPk(req.session.userId, {
			include: [
				{
					model: Note,
					as: "notes",
					attributes: ["id"],
				},
				{
					model: Note,
					as: "visibleNotes",
					attributes: ["id"],
				},
			],
		});
		for(let i = 0; i < user.notes.length; i++) {
			if (user.notes[i].id === parseInt(req.query.id)) {
				return next();
			}
		}
		for(let i = 0; i < user.visibleNotes.length; i++) {
			if (user.visibleNotes[i].id === parseInt(req.query.id)) {
				return next();
			}
		}
		return res.status(403).send("You are not allowed to view this document.");
	} catch (e) {
		console.log(e);
		return res.status(500).send("Something went wrong.");
	}
}

async function userAllowedToViewDoc(req, res, next) {
	if (req.user.id === req.doc.userId) {
		return next();
	}
	return res.status(403).send("You are not allowed to view this document.");
}

router.get("/edit", userAllowedAccessToDoc, async (req, res) => { 
	const doc = await Note.findByPk(req.query.id);
	res.render("pages/doc/edit", { doc,theme: req.query.theme, editCallback:"cb"});
});

router.get("/", userAllowedAccessToDoc, async (req, res) => { 
	const doc = await Note.findByPk(req.query.id, {
		include: [
			{
				model: Tag,
				as: "tags",
				attributes: ["id", "title", "color", "darkColor"],
			},
		],
	});
	res.render("pages/doc/view", { doc });
});

module.exports = router;