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
		let allowedDocIds = [];
		for(let i = 0; i < user.notes.length; i++) {
			if (user.notes[i].id === parseInt(req.query.id)) {
				return next();
			}
			allowedDocIds.push(user.notes[i].id);
		}
		for(let i = 0; i < user.visibleNotes.length; i++) {
			if (user.visibleNotes[i].id === parseInt(req.query.id)) {
				return next();
			}
			allowedDocIds.push(user.visibleNotes[i].id);
		}
		return res.status(403).send("You are not allowed to view this document." + allowedDocIds);
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

	if (req.query.id === "new") {
		const doc = await Note.create({
			title: "Untitled",
			content: "[]",
			type: "text",
			owner_id: req.session.userId,
		});
		return res.redirect("/internal/doc/edit?id=" + doc.id);
	}
	const doc = await Note.findByPk(req.query.id, {
		include: [
			{
				model: Tag,
				as:"tags"
			},
			{
				model: User,
				as: "sharedUsers",
				attributes: ["id", "email", "name"],
			}
		]
	});
	res.render("pages/doc/edit", { doc: doc.get({ plain: true }),theme: req.query.theme, editCallback:"cb"});
});

router.get("/", userAllowedAccessToDoc, async (req, res) => { 
	const doc = await Note.findByPk(req.query.id, {
		include: [
			{
				model: Tag,
				as: "tags",
			},
		],
	});
	res.render("pages/doc/view", { doc: doc.get({ plain: true }),theme: req.query.theme });
});

module.exports = router;