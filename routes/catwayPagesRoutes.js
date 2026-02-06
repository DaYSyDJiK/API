const express = require("express");
const router = express.Router();

const private = require("../middlewares/private");
const catwayService = require("../services/catwayService");



/**
 * Routes EJS (CRUD via formulaires) protégées par session.
 * @module routes/catwayPagesRoutes
 */


// LISTE
router.get("/", private, async (req, res) => {
  const catways = await catwayService.getAllCatways();
  res.render("catways/list", { user: req.session.user, catways });
});

// FORMULAIRE CREATION
router.get("/new", private, (req, res) => {
  res.render("catways/new", { user: req.session.user, error: null });
});

// CREATION (POST)
router.post("/new", private, async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    await catwayService.createCatway({ catwayNumber, catwayType, catwayState });
    res.redirect("/catways-page");
  } catch (error) {
    res.status(400).render("catways/new", { user: req.session.user, error: error.message });
  }
});

// FORMULAIRE EDIT ETAT
router.get("/:id/edit", private, async (req, res) => {
  const number = parseInt(req.params.id);
  const catway = await catwayService.getCatwayByNumber(number);
  if (!catway) return res.status(404).send("Catway introuvable");
  res.render("catways/edit", { user: req.session.user, catway, error: null });
});

// EDIT ETAT (POST)
router.post("/:id/edit", private, async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const { catwayState } = req.body;
    await catwayService.updateCatwayState(number, catwayState);
    res.redirect("/catways-page");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// SUPPRIMER (POST)
router.post("/:id/delete", private, async (req, res) => {
  const number = parseInt(req.params.id);
  await catwayService.deleteCatway(number);
  res.redirect("/catways-page");
});

module.exports = router;
