const express = require("express");
const router = express.Router();

const private = require("../middlewares/private");
const reservationService = require("../services/reservationService"); 

// Accueil
router.get("/", (req, res) => {
  res.render("home", { error: null });
});

// Docs
router.get("/docs", (req, res) => {
  res.render("docs");
});

// Dashboard protégé
router.get("/dashboard", private, async (req, res) => { 
  const currentReservations = await reservationService.getCurrentReservations(); 
  res.render("dashboard", { user: req.session.user, currentReservations }); 
});

module.exports = router;