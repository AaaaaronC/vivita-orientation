const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("./db");
const e = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const localStrategy = require("passport-local").Strategy;

const GOOGLE_CLIENT_ID =
  "541488741930-9j5pjiktr89l1t37rnrjlkjkpo7v27se.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

//Helper functions
const authUserLocal = (username, password, done) => {
  //function to find and return user that matches the parameters
  db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (res.length !== 0) {
      bcrypt.compare(password, res[0].password, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result === true) {
          console.log("Login successful!");
          return done(null, res[0]);
        } else {
          console.log("Wrong password!");
          return done(null, false);
        }
      });
    } else {
      console.log("No such user!");
      return done(null, false);
    }
  });
};

//Strategies
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (res.length !== 0) {
          //Logging into locally created account
          return done(null, res[0]);
        } else {
          //Logging into google account
          const user = {
            username: profile.displayName,
            email: profile.emails[0].value,
          };
          done(null, user);
        }
      });
    }
  )
);

passport.use(new localStrategy(authUserLocal));

//Recieves authenticatedUser object and attaches it to 'req.session.passport.user'
passport.serializeUser((user, done) => {
  return done(null, user);
});

//Obtains value atached to 'req.session.passport.user' and attaches it to 'req.user'
//Enables all routes to access user object via 'req.user'
passport.deserializeUser((user, done) => {
  return done(null, user);
});
