const express = require("express");
const router = express.Router();

const private = require("../middlewares/private");

// Accueil
router.get("/", (req, res) => {
  res.render("home", { error: null });
});

// Docs
router.get("/docs", (req, res) => {
  res.send("Documentation API à venir");
});

// Dashboard protégé
router.get("/dashboard", private, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

module.exports = router;
