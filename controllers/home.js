const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/home", { loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  res.render("pages/auth", { loggedIn: req.session.loggedIn });
});

router.get("/signup", (req, res) => {
  res.render("pages/auth", { loggedIn: req.session.loggedIn });
});

router.get("home", (req, res) => {
  res.render("pages/home", { loggedIn: req.session.loggedIn})
})

module.exports = router;
