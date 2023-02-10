const router = require("express").Router();
const User = require("../../models/User");

// create, update, delete user 
router.post("/", async (req, res) => {  // create a new user with the req.body values
    try { 
      const newUser = await User.create({  // create a new user record in the database 
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password, 
      }); 
      
      req.session.save(() => {  // save the user session so user can stay logged in 
        req.session.userId = newUser.id; 
        req.session.loggedIn = true; 
  
        console.log( "=======succeeded to create new user======");  // log success message
        res.status(200).json(newUser); 
      }); 
    } catch (err) { 
      console.log( "=======failed to create new user======");  // log failure message
      res.status(500).json(err); 
    } 
  }); 
  
  // log in 
  router.post("/login", async (req, res) => {   // check if username and password are correct
    try { 
      const userLogin = await User.findOne({   // find the user based on given email 
        where: { 
          email: req.body.email, 
        }, 
      }); 
  
      const validPassword = await userLogin.checkPassword(req.body.password);  // check password entered is matching with the stored password
  
      if (validPassword) {  
        console.log( "=======succeeded to log in======");  // log success message
        req.session.save(() => { 
          req.session.loggedIn = true; 
  
          res 
            .status(200) 
            .json({ user: userLogin, message: "You have logged in."}); 
        }); 
      } else { 
        console.log( "=======failed to log in======");  // log failure message 
        res.json({ message: "Incorrect email or password."}); 
      } 
    } catch (err) { 
      console.log( "=======failed to log in======");  // log failure message
      res.status(500).json(err); 
    } 
  }); 
  
  // log out 
  router.post("/logout", (req, res) => {  // delete the current user session  
    if (req.session.loggedIn) { 
      req.session.destroy(() => { 
        res.end(); 
      }); 
    } else { 
      console.log( "=======not logged in========");  // log message for not being logged in 
      res.status(404).end(); 
    } 
  });
