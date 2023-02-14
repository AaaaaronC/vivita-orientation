const mysql = require("mysql");

//Setting up db
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "AaronCZ2606!",
  database: "orientation-app",
  // database: "loginsystem",
});

//connecting to db
db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});

module.exports = db;
