const express = require("express");
const router = express.Router();

const private = require("../middlewares/private");
const reservationService = require("../services/reservationService");
const catwayService = require("../services/catwayService");



/**
 * Routes EJS (CRUD via formulaires) protégées par session.
 * @module routes/catwayPagesRoutes
 */


// LISTE
router.get("/", private, async (req, res) => {
  const reservations = await reservationService.getAllReservations();
  res.render("reservations/list", { user: req.session.user, reservations });
});

// FORM CREATE
router.get("/new", private, (req, res) => {
  res.render("reservations/new", { user: req.session.user, error: null });
});

// CREATE (POST)
router.post("/new", private, async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).render("reservations/new", { user: req.session.user, error: "Tous les champs sont obligatoires" });
    }

    const catwayNum = parseInt(catwayNumber);
    const catway = await catwayService.getCatwayByNumber(catwayNum);
    if (!catway) {
      return res.status(400).render("reservations/new", { user: req.session.user, error: "Catway introuvable" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return res.status(400).render("reservations/new", { user: req.session.user, error: "La date de début doit être avant la date de fin" });
    }

    await reservationService.createReservation({
      catwayNumber: catwayNum,
      clientName,
      boatName,
      startDate: start,
      endDate: end
    });

    return res.redirect("/reservations-page");
  } catch (error) {
    return res.status(400).render("reservations/new", { user: req.session.user, error: error.message });
  }
});

// FORM EDIT
router.get("/:id/edit", private, async (req, res) => {
  const reservation = await reservationService.getReservationById(req.params.id);
  if (!reservation) return res.status(404).send("Réservation introuvable");

  res.render("reservations/edit", { user: req.session.user, reservation, error: null });
});

// EDIT (POST)
router.post("/:id/edit", private, async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    const catwayNum = parseInt(catwayNumber);
    const catway = await catwayService.getCatwayByNumber(catwayNum);
    if (!catway) {
      const reservation = await reservationService.getReservationById(req.params.id);
      return res.status(400).render("reservations/edit", { user: req.session.user, reservation, error: "Catway introuvable" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      const reservation = await reservationService.getReservationById(req.params.id);
      return res.status(400).render("reservations/edit", { user: req.session.user, reservation, error: "La date de début doit être avant la date de fin" });
    }

    await reservationService.updateReservation(req.params.id, {
      catwayNumber: catwayNum,
      clientName,
      boatName,
      startDate: start,
      endDate: end
    });

    return res.redirect("/reservations-page");
  } catch (error) {
    return res.status(500).send("Erreur serveur");
  }
});

// DELETE (POST)
router.post("/:id/delete", private, async (req, res) => {
  await reservationService.deleteReservation(req.params.id);
  res.redirect("/reservations-page");
});

module.exports = router;