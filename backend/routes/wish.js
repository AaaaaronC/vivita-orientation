const router = require("express").Router();
const express = require("express");
const db = require("../db");

const app = express();
app.use(express.json()); //Auto parsing json objects sent from front end

router.post("/makewish", (req, res) => {
  const email = req.body.email;
  const wishTitle = req.body.wishTitle;
  const wishBody = req.body.wishBody;

  db.query(
    "INSERT INTO wishes (email, title, body) VALUES (?, ?, ?)",
    [email, wishTitle, wishBody],
    (err, result) => {
      if (err) res.send(err.code);
      else res.send({ message: "Your wish has been submitted!" });
    }
  );
});

router.post("/editwish", (req, res) => {
  const wishID = req.body.wishID;
  const wishTitle = req.body.wishTitle;
  const wishBody = req.body.wishBody;

  if (!wishTitle && !wishBody) {
    res.send("ER_BAD_NULL_ERROR");
    return;
  } else if (!wishTitle) {
    db.query(
      `UPDATE wishes SET body = '${wishBody}' WHERE wishID = ${wishID} `,
      (err, result) => {
        if (err) res.send(err.code);
        else res.send({ message: "Your wish has been edited!" });
      }
    );
  } else {
    db.query(
      `UPDATE wishes SET title = '${wishTitle}' WHERE wishID = ${wishID} `,
      (err, result) => {
        if (err) res.send(err.code);
        else res.send({ message: "Your wish has been edited!" });
      }
    );
  }
});

router.get("/getwishes", (req, res) => {
  db.query("SELECT * FROM wishes", (err, result) => {
    if (err) res.send(err.code);
    else res.send(result);
  });
});

router.post("/deletewish", (req, res) => {
  const wishID = req.body.wishID;
  db.query(`DELETE FROM wishes WHERE wishID=${wishID}`, (err, result) => {
    if (err) res.send(err.code);
    else res.send(result);
  });
});

module.exports = router;
