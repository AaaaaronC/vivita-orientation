const router = require("express").Router();
const passport = require("passport");
const db = require("../db");

// const CLIENT_URL = 'http://localhost:3000';
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (!user) {
      res.send(null);
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user);
      });
    }
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.post("/register", (req, res) => {
  const regUsername = req.body.regUsername;
  const regPassword = req.body.regPassword;
  const regEmail = req.body.regEmail;
  console.log("registering");
  db.query(
    "INSERT INTO users (username, email, password) VALUES (?,?,?)",
    [regUsername, regEmail, regPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err.code);
      } else {
        res.send({ message: "New User Registered!" });
      }
    }
  );
});

router.get("/getuser", (req, res) => {
  // console.log(req.user);
  res.send(req.user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
