const router = require("express").Router();
const User = require("../../models/User");

// create, update, delete user

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      console.log("=======succeeded to create new user======");
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log("=======failed to create new user======");
    res.status(500).json(err);
  }
});

// log in
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const validPassword = await userLogin.checkPassword(req.body.password);

    if (validPassword) {
      console.log("=======succeeded to log in======");
      req.session.save(() => {
        req.session.loggedIn = true;

        res
          .status(200)
          .json({ user: userLogin, message: "You have logged in." });
      });
    } else {
      console.log("=======failed to log in======");
      res.json({ message: "Incorrect email or password." });
    }
  } catch (err) {
    console.log("=======failed to log in======");
    res.status(500).json(err);
  }
});

// log out
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.end();
    });
  } else {
    console.log("=======not logged in========");
    res.status(404).end();
  }
});
