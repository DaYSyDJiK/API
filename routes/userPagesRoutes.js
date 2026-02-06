const express = require("express");
const router = express.Router();

const private = require("../middlewares/private");
const userService = require("../services/userService");



/**
 * Routes EJS (CRUD via formulaires) protégées par session.
 * @module routes/catwayPagesRoutes
 */


// LISTE
router.get("/", private, async (req, res) => {
  const users = await userService.getAllUsers();
  res.render("users/list", { user: req.session.user, users });
});

// FORM CREATE
router.get("/new", private, (req, res) => {
  res.render("users/new", { user: req.session.user, error: null });
});

// CREATE (POST)
router.post("/new", private, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userService.createUser({ username, email, password });
    return res.redirect("/users-page");
  } catch (err) {
    return res.status(400).render("users/new", { user: req.session.user, error: err.message });
  }
});

// FORM EDIT (par email)
router.get("/:email/edit", private, async (req, res) => {
  const userToEdit = await userService.getUserByEmail(req.params.email);
  if (!userToEdit) return res.status(404).send("Utilisateur introuvable");

  res.render("users/edit", { user: req.session.user, userToEdit, error: null });
});

// EDIT (POST)
router.post("/:email/edit", private, async (req, res) => {
  try {
    const userToEdit = await userService.getUserByEmail(req.params.email);
    if (!userToEdit) return res.status(404).send("Utilisateur introuvable");

    const { username, password } = req.body;

    await userService.updateUser(userToEdit._id, {
      username,
      password 
    });

    return res.redirect("/users-page");
  } catch (err) {
    const userToEdit = await userService.getUserByEmail(req.params.email);
    return res.status(400).render("users/edit", { user: req.session.user, userToEdit, error: err.message });
  }
});

// DELETE (POST)
router.post("/:email/delete", private, async (req, res) => {
  const userToDelete = await userService.getUserByEmail(req.params.email);
  if (!userToDelete) return res.redirect("/users-page");

  await userService.deleteUser(userToDelete._id);
  res.redirect("/users-page");
});

module.exports = router;