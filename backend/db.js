const mysql = require("mysql");

//Setting up db
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "AaronCZ2606!",
  // database: "LogInSystem",
  database: "orientation-app",
});

//connecting to db
db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});

module.exports = db;
