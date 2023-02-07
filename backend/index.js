//Import express
const express = require("express");
const app = express();

const cors = require("cors");

//Import passport and express-session library
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./passport");

//Import routes
const authRoute = require("./routes/auth");
const wishRoute = require("./routes/wish");

//import parsers
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Enable mysql
const mysql = require("mysql");

// const CLIENT_URL = 'http://localhost:3000';
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json()); //Auto parsing json objects sent from front end

app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on port: ${BACKEND_PORT}`);
});

//initialize express-session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    secure: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 2000000,
    },
  })
);

//init parser
app.use(cookieParser("secret"));

//init passport on every route call
app.use(passport.initialize());

//allow passport to use 'express-session'
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/wish", wishRoute);
